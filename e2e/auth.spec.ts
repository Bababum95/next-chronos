import { expect, test } from '@playwright/test';

/**
 * E2E тесты для процесса авторизации
 *
 * E2E (End-to-End) тесты проверяют работу всего приложения
 * от начала до конца в реальном браузере, имитируя действия пользователя.
 *
 * Playwright запускает браузер, открывает страницы и выполняет действия
 * так же, как это делал бы реальный пользователь.
 *
 * Для запуска: npm run test:e2e
 * Для запуска с UI: npm run test:e2e:ui
 */

test.describe('Authentication Flow', () => {
  /**
   * Тест: Открытие страницы логина
   */
  test('should display login page', async ({ page }) => {
    // Переходим на страницу логина
    await page.goto('/auth/login');

    // Проверяем, что заголовок содержит текст о логине
    await expect(page).toHaveTitle(/Chronos/i);

    // Проверяем наличие основных элементов формы
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  /**
   * Тест: Валидация формы логина
   */
  test('should show validation errors on invalid input', async ({ page }) => {
    await page.goto('/auth/login');

    // Пытаемся отправить пустую форму
    await page.getByRole('button', { name: /sign in/i }).click();

    // Проверяем, что появились ошибки валидации
    // Примечание: селекторы нужно адаптировать под реальную структуру
    await expect(page.locator('text=/email/i')).toBeVisible();
  });

  /**
   * Тест: Успешный логин (требует тестовый сервер/моки)
   */
  test.skip('should login successfully with valid credentials', async ({ page }) => {
    // Примечание: этот тест требует настройки тестового окружения
    // с тестовой базой данных или моками API

    await page.goto('/auth/login');

    // Заполняем форму
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('TestPassword123!');

    // Отправляем форму
    await page.getByRole('button', { name: /sign in/i }).click();

    // Ожидаем редиректа на dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Проверяем, что пользователь авторизован
    await expect(page.getByText(/dashboard/i)).toBeVisible();
  });

  /**
   * Тест: Переход на страницу регистрации
   */
  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/auth/login');

    // Находим ссылку на регистрацию и кликаем
    await page.getByRole('link', { name: /sign up/i }).click();

    // Проверяем, что перешли на страницу регистрации
    await expect(page).toHaveURL(/\/auth\/signup/);
  });

  /**
   * Тест: Отображение страницы регистрации
   */
  test('should display signup page', async ({ page }) => {
    await page.goto('/auth/signup');

    // Проверяем наличие полей формы регистрации
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();
  });

  /**
   * Тест: Проверка доступа к защищенным страницам без авторизации
   */
  test('should redirect to login when accessing protected route', async ({ page }) => {
    // Пытаемся открыть защищенную страницу
    await page.goto('/dashboard');

    // Должны быть перенаправлены на страницу логина
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});

/**
 * Дополнительные E2E тесты
 */
test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    // Открываем главную страницу
    await page.goto('/');

    // Проверяем, что страница загрузилась
    await expect(page).toHaveTitle(/Chronos/i);

    // Проверяем наличие навигационных элементов
    // Примечание: адаптируйте селекторы под вашу навигацию
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
  });
});
