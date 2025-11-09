import { defineConfig, devices } from '@playwright/test';

/**
 * Конфигурация Playwright для E2E тестов
 *
 * Playwright - это фреймворк для E2E тестирования, который запускает
 * реальный браузер и позволяет тестировать приложение как пользователь.
 *
 * Документация: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Путь к директории с тестами
  testDir: './e2e',

  // Максимальное время выполнения одного теста
  timeout: 30 * 1000,

  // Количество повторных попыток при падении теста
  retries: process.env.CI ? 2 : 0,

  // Количество параллельных worker'ов
  workers: process.env.CI ? 1 : undefined,

  // Репортеры для результатов тестов
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],

  // Общие настройки для всех тестов
  use: {
    // Базовый URL приложения
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',

    // Делать скриншот только при падении теста
    screenshot: 'only-on-failure',

    // Записывать trace только при падении теста
    trace: 'retain-on-failure',

    // Записывать видео только при падении теста
    video: 'retain-on-failure',
  },

  // Конфигурация проектов для разных браузеров
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Раскомментируйте для тестирования в Firefox
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // Раскомментируйте для тестирования в WebKit (Safari)
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Раскомментируйте для тестирования на мобильных устройствах
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Запускать dev server перед тестами
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
