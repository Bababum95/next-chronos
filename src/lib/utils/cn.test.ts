import { cn } from './cn';

/**
 * Unit тесты для утилиты cn (className merger)
 *
 * Функция cn объединяет классы с помощью clsx и twMerge,
 * что позволяет правильно мержить Tailwind CSS классы.
 *
 * Для запуска: npm test cn.test
 */
describe('cn', () => {
  it('merges multiple class names', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional', false && 'not-included')).toBe('base conditional');
  });

  it('merges tailwind classes correctly', () => {
    // twMerge должен убрать дубликаты и конфликтующие классы
    const result = cn('px-2 py-1', 'px-4');
    // px-4 должен заменить px-2
    expect(result).toBe('py-1 px-4');
  });

  it('handles undefined and null values', () => {
    expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2');
  });

  it('handles empty strings', () => {
    expect(cn('', 'class1', '', 'class2')).toBe('class1 class2');
  });

  it('handles arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('handles objects with boolean values', () => {
    expect(
      cn({
        class1: true,
        class2: false,
        class3: true,
      })
    ).toBe('class1 class3');
  });

  it('deduplicates classes', () => {
    expect(cn('class1', 'class2', 'class1')).toBe('class1 class2');
  });

  it('handles complex tailwind conflicts', () => {
    // Более сложный пример: конфликтующие классы
    const result = cn('bg-red-500 text-white', 'bg-blue-500');
    expect(result).toBe('text-white bg-blue-500');
  });

  it('returns empty string when no classes provided', () => {
    expect(cn()).toBe('');
  });
});
