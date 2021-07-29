import * as chalk from 'chalk';
import * as path from 'path';
import {
  ClassDeclaration,
  ImportDeclarationStructure,
  InterfaceDeclarationStructure,
  Project,
  PropertySignatureStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { getFileName, getInterfaceName } from '../helpers';
import { ClassToInterfaceOptions } from '../interfaces';

/**
 * Generate interfaces from existing TypeScript classes.
 *
 * @param glob TypeScript class files.
 * @param options CLI arguments.
 */
export function classToInterface(
  glob: string,
  options: ClassToInterfaceOptions
) {
  const target = new Project();
  const source = new Project();
  source.addSourceFilesAtPaths(glob);

  // get all classes before generating interfaces
  const classes = getAllClasses(source);

  for (const [className, classDec] of classes) {
    const fileName = getFileName(className, options.fileNameCasing);
    const interfaceName = getInterfaceName(
      className,
      options.prefix,
      options.suffix
    );
    const dest = path.join(options.outDir || '', `${fileName}.ts`);
    const file = target.createSourceFile(dest, {}, { overwrite: true });
    const result = extractInterface(classDec, classes, options);

    file.addImportDeclarations(result.importDecs);
    file.addInterface(result.interfaceDec);

    console.log(`Generated: ${interfaceName}`);
  }

  target.saveSync();
  console.log(chalk.green(`Generated ${classes.size} interfaces!`));
}

/**
 * Get all classes.
 *
 * @param project Project instance.
 */
function getAllClasses(project: Project) {
  const result = new Map<string, ClassDeclaration>();
  const files = project.getSourceFiles();

  files.forEach((file) => {
    const classes = file.getClasses();

    classes.forEach((classDec) => {
      const name = classDec.getName();

      if (name) {
        result.set(name, classDec);
      }
    });
  });

  return result;
}

/**
 * Extract information needed to generate interface.
 *
 * @param classDec Source class declaration.
 * @param classes All source class declarations.
 * @param options CLI arguments.
 */
function extractInterface(
  classDec: ClassDeclaration,
  classes: Map<string, ClassDeclaration>,
  options: ClassToInterfaceOptions
) {
  const className = classDec.getName() as string;
  const interfaceName = getInterfaceName(className, options.prefix);
  const classProps = classDec
    .getProperties()
    .filter((prop) => prop.getScope() === Scope.Public);
  const classGetAccessors = classDec
    .getGetAccessors()
    .filter((prop) => prop.getScope() === Scope.Public);
  const extendsType = classDec.getExtends()?.getText();
  const propertyDecs: PropertySignatureStructure[] = [];
  const importDecs: ImportDeclarationStructure[] = [];
  const extendsNames: string[] = [];

  if (extendsType && classes.has(extendsType)) {
    const extendsName = getInterfaceName(extendsType, options.prefix);
    const path = `./${getFileName(extendsType, options.fileNameCasing)}`;
    extendsNames.push(extendsName);

    if (!importDecs.some((x) => x.moduleSpecifier === path)) {
      importDecs.push({
        kind: StructureKind.ImportDeclaration,
        namedImports: [extendsName],
        moduleSpecifier: path,
      });
    }
  }

  classProps.forEach((prop) => {
    const type = prop.getType();
    let propName = type.getText(prop);
    let interfaceName: string | undefined;

    if (type.isClass() && classes.has(propName)) {
      interfaceName = getInterfaceName(propName, options.prefix);
    } else if (type.isArray()) {
      propName = type.getArrayElementType()?.getText(prop) as string;

      if (classes.has(propName)) {
        interfaceName = getInterfaceName(propName, options.prefix);
      }
    }

    if (interfaceName) {
      const path = `./${getFileName(propName, options.fileNameCasing)}`;

      if (!importDecs.some((x) => x.moduleSpecifier === path)) {
        importDecs.push({
          kind: StructureKind.ImportDeclaration,
          namedImports: [interfaceName],
          moduleSpecifier: path,
        });
      }
    }

    propertyDecs.push({
      kind: StructureKind.PropertySignature,
      name: prop.getName(),
      type: interfaceName || propName,
      hasQuestionToken: prop.hasQuestionToken(),
      isReadonly: prop.isReadonly(),
    });
  });

  classGetAccessors.forEach((prop) => {
    propertyDecs.push({
      kind: StructureKind.PropertySignature,
      name: prop.getName(),
      type: prop.getType().getText(prop),
    });
  });

  const interfaceDec: InterfaceDeclarationStructure = {
    kind: StructureKind.Interface,
    name: interfaceName,
    typeParameters: classDec.getTypeParameters().map((p) => p.getStructure()),
    isExported: true,
    properties: propertyDecs,
    extends: extendsNames,
  };

  return {
    interfaceDec,
    importDecs,
  };
}
