/**
 * Class to interface options.
 */
export interface ClassToInterfaceOptions {
  prefix?: string;
  suffix?: string;
  fileNameCasing?: CasingType;
  outDir?: string;
}

/**
 * Supported casing types.
 */
export type CasingType = 'kebab' | 'camel' | 'pascal';
