import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

import { useLogin } from '@/features/auth/hooks/useLogin';

/**
 * Integration тесты для useLogin хука
 *
 * Integration тесты проверяют взаимодействие хука с React Query,
 * валидацию форм и обработку ошибок.
 *
 * Для запуска: npm test useLogin.integration.test
 */

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock toast notifications
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock fetcher
jest.mock('@/lib/utils/fetcher', () => ({
  createAuthenticatedMutation: jest.fn(() => jest.fn()),
}));

// Mock auth storage
jest.mock('@/lib/utils/auth', () => ({
  tokenStorage: {
    setToken: jest.fn(),
    getToken: jest.fn(),
    removeToken: jest.fn(),
  },
}));

/**
 * Helper function: создает wrapper с QueryClient для тестов
 */
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useLogin Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    expect(result.current.formData).toEqual({
      email: '',
      password: '',
      remember: false,
    });

    expect(result.current.state.isLoading).toBe(false);
    expect(result.current.state.fieldErrors).toEqual({});
    expect(result.current.state.hasError).toBe(false);
  });

  it('should update form field values', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Act: обновляем email
    result.current.updateField('email', 'test@example.com');

    // Assert: проверяем, что значение обновилось
    expect(result.current.formData.email).toBe('test@example.com');
  });

  it('should validate email field', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Act: пытаемся отправить форму с невалидным email
    result.current.updateField('email', 'invalid-email');
    result.current.updateField('password', 'ValidPass123!');

    await result.current.handleSubmit({ preventDefault: jest.fn() } as any);

    // Assert: проверяем, что есть ошибка валидации
    await waitFor(() => {
      expect(result.current.state.hasError).toBe(true);
    });
  });

  it('should validate password field', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Act: пытаемся отправить форму с невалидным паролем
    result.current.updateField('email', 'test@example.com');
    result.current.updateField('password', '123'); // слишком короткий

    await result.current.handleSubmit({ preventDefault: jest.fn() } as any);

    // Assert: проверяем, что есть ошибка валидации
    await waitFor(() => {
      expect(result.current.state.hasError).toBe(true);
    });
  });

  it('should clear field error when user starts typing', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Arrange: устанавливаем ошибку
    result.current.setFieldError('email', 'Invalid email');
    expect(result.current.state.fieldErrors.email).toBe('Invalid email');

    // Act: обновляем поле
    result.current.updateField('email', 'new@example.com');

    // Assert: ошибка должна исчезнуть
    expect(result.current.state.fieldErrors.email).toBeUndefined();
  });

  it('should reset form to initial state', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Arrange: заполняем форму
    result.current.updateField('email', 'test@example.com');
    result.current.updateField('password', 'password123');
    result.current.setFieldError('email', 'Some error');

    // Act: сбрасываем форму
    result.current.resetForm();

    // Assert: проверяем, что форма в начальном состоянии
    expect(result.current.formData).toEqual({
      email: '',
      password: '',
      remember: false,
    });
    expect(result.current.state.fieldErrors).toEqual({});
  });

  it('should handle manual field error management', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Act: устанавливаем ошибку
    result.current.setFieldError('email', 'Email already exists');
    expect(result.current.state.fieldErrors.email).toBe('Email already exists');

    // Act: очищаем ошибку
    result.current.clearFieldError('email');
    expect(result.current.state.fieldErrors.email).toBeUndefined();
  });
});
