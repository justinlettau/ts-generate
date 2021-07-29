import { camelCase, paramCase, pascalCase } from 'change-case';

import { CasingType } from './interfaces';

/**
 * Get file name.
 *
 * @param base Base file name.
 * @param casing File name casing.
 */
export function getFileName(base: string, casing?: CasingType) {
  switch (casing) {
    case 'kebab':
      return paramCase(base);
    case 'camel':
      return camelCase(base);
    case 'pascal':
      return pascalCase(base);
    default:
      return base;
  }
}

/**
 * Get interface name.
 *
 * @param base Base interface name.
 * @param prefix Optional name prefix.
 * @param suffix Optional name suffix.
 */
export function getInterfaceName(
  base: string,
  prefix?: string,
  suffix?: string
) {
  if (prefix) {
    base = prefix + base;
  }

  if (suffix) {
    base = base + suffix;
  }

  return base;
}
