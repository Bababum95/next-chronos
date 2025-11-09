# Testing Guide - Next Chronos

Руководство по тестированию Next.js приложения.

## Содержание

- [Обзор](#обзор)
- [Типы тестов](#типы-тестов)
- [Запуск тестов](#запуск-тестов)
- [Структура тестов](#структура-тестов)
- [Примеры](#примеры)
- [Best Practices](#best-practices)

## Обзор

В проекте настроены три типа тестов:

- **Unit тесты** - тестирование компонентов и утилит в изоляции
- **Integration тесты** - тестирование хуков и взаимодействия с React Query
- **E2E тесты** - тестирование всего приложения в браузере

Используемые инструменты:
- Jest - тестовый фреймворк
- React Testing Library - тестирование React компонентов
- Playwright - E2E тестирование в браузере
- @testing-library/user-event - симуляция действий пользователя

## Типы тестов

### Unit тесты

**Назначение:** Тестирование отдельных компонентов и функций.

**Расположение:** Рядом с тестируемым файлом (например, `button.test.tsx`)

**Пример:**
```typescript
describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration тесты

**Назначение:** Тестирование хуков, форм и взаимодействия с React Query.

**Расположение:** `src/__tests__/integration/`

**Особенности:**
- Используют QueryClientProvider для React Query
- Тестируют реальную работу хуков
- Проверяют взаимодействие компонентов

**Пример:**
```typescript
const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

const { result } = renderHook(() => useLogin(), {
  wrapper: createWrapper(),
});
```

### E2E тесты

**Назначение:** Тестирование всего приложения в реальном браузере.

**Расположение:** `e2e/`

**Особенности:**
- Запускают реальный браузер (Chromium, Firefox, WebKit)
- Имитируют действия пользователя
- Проверяют полный user flow

**Пример:**
```typescript
test('should login successfully', async ({ page }) => {
  await page.goto('/auth/login');
  
  await page.getByLabel(/email/i).fill('test@example.com');
  await page.getByLabel(/password/i).fill('password');
  await page.getByRole('button', { name: /sign in/i }).click();
  
  await expect(page).toHaveURL(/\/dashboard/);
});
```

## Запуск тестов

### Unit и Integration тесты

```bash
# Запустить все тесты
npm test

# Запустить в watch mode
npm run test:watch

# Запустить с coverage
npm run test:coverage
```

Результаты coverage сохраняются в папке `coverage/`

### E2E тесты (Playwright)

```bash
# Запустить все E2E тесты
npm run test:e2e

# Запустить с UI интерфейсом
npm run test:e2e:ui

# Запустить в debug mode
npx playwright test --debug

# Запустить конкретный тест
npx playwright test auth.spec.ts
```

### Playwright Inspector

```bash
# Открыть Playwright Inspector для отладки
npx playwright test --debug
```

### Playwright Report

После запуска тестов можно посмотреть HTML отчет:
```bash
npx playwright show-report
```

## Структура тестов

```
next-chronos/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       └── button.test.tsx           # Unit тесты компонента
│   ├── lib/
│   │   └── utils/
│   │       ├── cn.ts
│   │       └── cn.test.ts                # Unit тесты утилиты
│   └── __tests__/
│       └── integration/
│           └── useLogin.integration.test.tsx  # Integration тесты
├── e2e/
│   └── auth.spec.ts                      # E2E тесты
├── jest.config.js                        # Конфигурация Jest
├── jest.setup.js                         # Глобальные настройки Jest
└── playwright.config.ts                  # Конфигурация Playwright
```

## Примеры

### Unit тест компонента

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('disables button when disabled prop is true', async () => {
    const handleClick = jest.fn();
    
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### Unit тест утилиты

```typescript
import { cn } from './cn';

describe('cn', () => {
  it('merges tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });
});
```

### Integration тест хука

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLogin } from '@/features/auth/hooks/useLogin';

describe('useLogin', () => {
  it('should update form field values', () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
    
    const { result } = renderHook(() => useLogin(), { wrapper });
    
    result.current.updateField('email', 'test@example.com');
    expect(result.current.formData.email).toBe('test@example.com');
  });
});
```

### E2E тест

```typescript
import { test, expect } from '@playwright/test';

test('should display login page', async ({ page }) => {
  await page.goto('/auth/login');
  
  await expect(page).toHaveTitle(/Chronos/i);
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
});
```

## Best Practices

### 1. React Testing Library принципы

**Тестируйте как пользователь:**
```typescript
// ✅ Хорошо - используем роли и текст
screen.getByRole('button', { name: /submit/i })
screen.getByText(/welcome/i)

// ❌ Плохо - используем implementation details
screen.getByTestId('submit-button')
container.querySelector('.button-class')
```

### 2. Асинхронное тестирование

**Используйте waitFor для асинхронных операций:**
```typescript
// ✅ Хорошо
await waitFor(() => {
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

// ❌ Плохо - может привести к flaky тестам
await new Promise(resolve => setTimeout(resolve, 1000));
expect(screen.getByText(/success/i)).toBeInTheDocument();
```

### 3. User Events

**Используйте @testing-library/user-event вместо fireEvent:**
```typescript
// ✅ Хорошо - более реалистично
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'text');

// ❌ Плохо - слишком низкоуровнево
fireEvent.click(button);
fireEvent.change(input, { target: { value: 'text' } });
```

### 4. Моки

**Мокируйте внешние зависимости:**
```typescript
// Моки Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Моки API
jest.mock('@/lib/api', () => ({
  fetchUser: jest.fn(),
}));
```

### 5. E2E тесты

**Используйте селекторы в правильном порядке приоритета:**
1. `getByRole` - самый надежный
2. `getByLabelText` - для форм
3. `getByPlaceholderText` - для инпутов
4. `getByText` - для контента
5. `getByTestId` - последний вариант

```typescript
// ✅ Лучший вариант
await page.getByRole('button', { name: /submit/i });

// ✅ Хороший вариант
await page.getByLabel(/email/i);

// ⚠️ Допустимо
await page.getByTestId('submit-button');
```

### 6. Что тестировать

**Тестируйте:**
- Рендеринг компонентов
- Взаимодействие пользователя
- Условную логику
- Обработку ошибок
- Валидацию форм

**Не тестируйте:**
- Стили (используйте визуальное тестирование)
- Внешние библиотеки
- Тривиальные компоненты без логики

### 7. Coverage цели

- **Components:** 70-80%
- **Hooks:** 80-90%
- **Utils:** 90%+
- **Pages:** 50-60% (больше E2E)

## Моки и Setup

### jest.setup.js

Глобальные моки для всех тестов:

```javascript
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
```

### Playwright fixtures

Создание переиспользуемых fixtures:

```typescript
// e2e/fixtures.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Логин перед тестом
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await use(page);
  },
});
```

## Troubleshooting

### Проблема: "Cannot find module '@/...'"

**Решение:** Проверьте `moduleNameMapper` в `jest.config.js`:
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

### Проблема: "ReferenceError: fetch is not defined"

**Решение:** Добавьте полифилл в `jest.setup.js`:
```javascript
global.fetch = jest.fn();
```

### Проблема: Playwright тесты таймаутятся

**Решение:** Увеличьте timeout в `playwright.config.ts`:
```typescript
timeout: 60 * 1000, // 60 секунд
```

### Проблема: Flaky E2E тесты

**Решение:**
- Используйте `waitFor` вместо `setTimeout`
- Проверяйте видимость элементов перед взаимодействием
- Избегайте жестко заданных задержек
- Используйте `test.slow()` для медленных тестов

## Дополнительные ресурсы

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)


