import { getFileName, getInterfaceName } from './helpers';

describe('helpers', () => {
  describe('getFileName', () => {
    test('should return file name with no change', () => {
      const result = getFileName('mixedUp-and-Awesome');
      expect(result).toBe('mixedUp-and-Awesome');
    });

    test('should return file name as kebab case', () => {
      const result = getFileName('niceAndEasy', 'kebab');
      expect(result).toBe('nice-and-easy');
    });

    test('should return file name as camel case', () => {
      const result = getFileName('AwesomeSauce', 'camel');
      expect(result).toBe('awesomeSauce');
    });

    test('should return file name as pascal case', () => {
      const result = getFileName('super-awesome', 'pascal');
      expect(result).toBe('SuperAwesome');
    });
  });

  describe('getInterfaceName', () => {
    test('should return base name when no prefix', () => {
      const result = getInterfaceName('MyClass');
      expect(result).toBe('MyClass');
    });

    test('should return include prefix when present', () => {
      const result = getInterfaceName('MyClass', 'I');
      expect(result).toBe('IMyClass');
    });
  });
});
