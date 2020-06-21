/**
 * Class to interface options.
 */
export interface ClassToInterfaceOptions {
  prefix?: string;
  fileNameCasing?: CasingType;
  outDir?: string;
}

/**
 * Supported casing types.
 */
export type CasingType = 'kebab' | 'camel' | 'pascal';
