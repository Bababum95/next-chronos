# Схема базы данных Chronos

## Обзор

Проект Chronos использует MongoDB в качестве основной базы данных для хранения пользовательских данных и heartbeat'ов (данных активности). База данных состоит из трёх основных коллекций: `users`, `heartbeats` и `hourly_activities`.

## Подключение к базе данных

- **СУБД**: MongoDB
- **ORM**: Mongoose
- **Переменные окружения**:
  - `MONGODB_URI` - URI для подключения к MongoDB
  - `INTERVAL_SEC` - Интервал в секундах для расчета активности (по умолчанию 120)
- **Файл подключения**: `/src/lib/mongoose/connect.ts`

## Коллекции

### 1. Users (Пользователи)

Коллекция `users` содержит информацию о зарегистрированных пользователях системы.

#### Схема

```typescript
type UserDoc = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  apiKey: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
```

#### Поля

| Поле              | Тип      | Обязательное | Описание                              | Ограничения                                     |
| ----------------- | -------- | ------------ | ------------------------------------- | ----------------------------------------------- |
| `_id`             | ObjectId | Да           | Уникальный идентификатор пользователя | Автогенерируется MongoDB                        |
| `name`            | String   | Да           | Имя пользователя                      | 2-50 символов, обрезается пробелы               |
| `email`           | String   | Да           | Email адрес                           | Уникальный, нижний регистр, валидация email     |
| `password`        | String   | Да           | Хэшированный пароль                   | Минимум 6 символов, хэшируется bcrypt с salt=12 |
| `apiKey`          | String   | Да           | API ключ для аутентификации           | Уникальный, формат: `chronos_${uuid}`           |
| `isEmailVerified` | Boolean  | Нет          | Статус верификации email              | По умолчанию: `false`                           |
| `createdAt`       | Date     | Да           | Дата создания                         | Автогенерируется                                |
| `updatedAt`       | Date     | Да           | Дата последнего обновления            | Автообновляется                                 |

#### Индексы

- `email`: Уникальный индекс
- `apiKey`: Уникальный индекс

#### Валидация

- **name**:
  - Обязательное поле
  - Длина: 2-50 символов
  - Обрезаются пробелы в начале и конце
- **email**:
  - Обязательное поле
  - Уникальное значение
  - Автоматически приводится к нижнему регистру
  - Валидация регулярным выражением: `/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/`
- **password**:
  - Обязательное поле
  - Минимальная длина: 6 символов
  - Максимальная длина: 100 символов (на уровне API)
  - Автоматически хэшируется перед сохранением

- **apiKey**:
  - Автогенерируется в формате `chronos_${uuid}`
  - Формат UUID: `/^(chronos_)?[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i`

#### Методы модели

- `comparePassword(candidatePassword: string)`: Сравнение пароля с хэшем
- `findByApiKey(apiKey: string)`: Поиск пользователя по API ключу

#### Middleware

- **Pre-save**: Хэширование пароля при изменении

### 2. Heartbeats (Данные активности)

Коллекция `heartbeats` хранит данные о активности пользователей в редакторе кода.

#### Схема

```typescript
type HeartbeatDoc = {
  user: mongoose.Types.ObjectId;
  time: number;
  entity: string;
  is_write: boolean;
  lineno: number;
  cursorpos: number;
  lines_in_file: number;
  alternate_project?: string;
  git_branch?: string;
  project_folder?: string;
  project_root_count?: number;
  language?: string;
  category?: 'debugging' | 'ai coding' | 'building' | 'code reviewing';
  ai_line_changes?: number;
  human_line_changes?: number;
  is_unsaved_entity?: boolean;
};
```

#### Поля

| Поле                 | Тип      | Обязательное | Описание                             |
| -------------------- | -------- | ------------ | ------------------------------------ |
| `user`               | ObjectId | Да           | Ссылка на пользователя (ref: 'User') |
| `time`               | Number   | Да           | Unix timestamp события               |
| `entity`             | String   | Да           | Путь к файлу или сущности            |
| `is_write`           | Boolean  | Да           | Флаг операции записи                 |
| `lineno`             | Number   | Да           | Номер строки курсора                 |
| `cursorpos`          | Number   | Да           | Позиция курсора                      |
| `lines_in_file`      | Number   | Да           | Общее количество строк в файле       |
| `alternate_project`  | String   | Нет          | Альтернативное имя проекта           |
| `git_branch`         | String   | Нет          | Git ветка                            |
| `project_folder`     | String   | Нет          | Папка проекта                        |
| `project_root_count` | Number   | Нет          | Количество корневых проектов         |
| `language`           | String   | Нет          | Язык программирования                |
| `category`           | String   | Нет          | Категория активности                 |
| `ai_line_changes`    | Number   | Нет          | Количество изменений строк ИИ        |
| `human_line_changes` | Number   | Нет          | Количество изменений строк человеком |
| `is_unsaved_entity`  | Boolean  | Нет          | Флаг несохраненной сущности          |
| `createdAt`          | Date     | Да           | Дата создания (автогенерируется)     |
| `updatedAt`          | Date     | Да           | Дата обновления (автогенерируется)   |

#### Категории активности

Поле `category` может принимать следующие значения:

- `debugging` - Отладка
- `ai coding` - Кодирование с ИИ
- `building` - Сборка проекта
- `code reviewing` - Ревью кода

#### Индексы

Рекомендуется создать следующие индексы для оптимизации запросов:

- `{ user: 1, time: 1 }` - Для запросов временных рядов по пользователю
- `{ user: 1, createdAt: -1 }` - Для получения последних heartbeat'ов

### 3. HourlyActivities (Почасовая активность)

Коллекция `hourly_activities` хранит агрегированные данные о почасовой активности пользователей.

#### Схема

```typescript
type HourlyActivityDoc = {
  user: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  hour: number; // 0–23
  composite_key: string; // Уникальный ключ для группировки
  alternate_project?: string;
  project_folder?: string;
  git_branch?: string;
  language?: string;
  category?: 'debugging' | 'ai coding' | 'building' | 'code reviewing';
  time_spent: number; // в секундах
  createdAt: Date;
  updatedAt: Date;
};
```

#### Поля

| Поле                | Тип      | Обязательное | Описание                             | Ограничения                     |
| ------------------- | -------- | ------------ | ------------------------------------ | ------------------------------- |
| `user`              | ObjectId | Да           | Ссылка на пользователя (ref: 'User') | -                               |
| `date`              | String   | Да           | Дата в формате YYYY-MM-DD            | Валидация регулярным выражением |
| `hour`              | Number   | Да           | Час дня (0-23)                       | Минимум: 0, Максимум: 23        |
| `composite_key`     | String   | Да           | Уникальный ключ для группировки      | Уникальный индекс               |
| `alternate_project` | String   | Нет          | Альтернативное имя проекта           | -                               |
| `project_folder`    | String   | Нет          | Папка проекта                        | -                               |
| `git_branch`        | String   | Нет          | Git ветка                            | -                               |
| `language`          | String   | Нет          | Язык программирования                | -                               |
| `category`          | String   | Нет          | Категория активности                 | Enum значения (см. ниже)        |
| `time_spent`        | Number   | Да           | Время активности в секундах          | Минимум: 0                      |
| `createdAt`         | Date     | Да           | Дата создания (автогенерируется)     | -                               |
| `updatedAt`         | Date     | Да           | Дата обновления (автогенерируется)   | -                               |

#### Категории активности

Поле `category` может принимать следующие значения:

- `debugging` - Отладка
- `ai coding` - Кодирование с ИИ
- `building` - Сборка проекта
- `code reviewing` - Ревью кода

#### Индексы

Созданы следующие индексы для оптимизации запросов:

- `composite_key` - Уникальный индекс для предотвращения дублирования записей
- `{ user: 1, date: 1 }` - Для запросов данных по дням
- `{ user: 1, composite_key: 1 }` - Для поиска по составному ключу

#### Валидация

- **date**: Обязательное поле, должно соответствовать формату YYYY-MM-DD
- **hour**: Обязательное поле, должно быть в диапазоне от 0 до 23
- **time_spent**: Обязательное поле, должно быть неотрицательным числом
- **category**: Опциональное поле, если указано, должно быть одним из допустимых значений enum

## API Endpoints

### Аутентификация

Все API endpoints требуют аутентификации через API ключ, который передается в заголовке:

```
Authorization: Bearer chronos_${uuid}
```

### Основные endpoints

1. **POST /api/v1/heartbeats** - Сохранение heartbeat'ов
2. **GET /api/v1/timeseries** - Получение временных рядов
3. **GET /api/v1/summaries** - Получение сводок активности
4. **POST /api/v1/auth/signup** - Регистрация пользователя
5. **POST /api/v1/auth/signin** - Вход пользователя
6. **GET /api/v1/ping** - Проверка работоспособности API
7. **GET /api/v1/swagger** - Документация API в формате OpenAPI
8. **GET /api/v1/users/by-api-key** - Получение пользователя по API ключу

## Валидация данных

Проект использует библиотеку Zod для валидации входящих данных:

### Heartbeats валидация

```typescript
const HeartbeatsSchema = z.object({
  heartbeats: z
    .array(
      z.object({
        time: z.number(),
        entity: z.string(),
        is_write: z.boolean(),
        lineno: z.number(),
        cursorpos: z.number(),
        lines_in_file: z.number(),
        // ... остальные опциональные поля
      })
    )
    .min(1, 'At least one heartbeat is required'),
});
```

### Пользователь валидация

```typescript
const SignUpSchema = z
  .object({
    name: z.string().min(2).max(50).trim(),
    email: z.email().toLowerCase().trim(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true),
  })
  .refine((data) => data.password === data.confirmPassword);
```

## Безопасность

1. **Пароли**: Хэшируются с помощью bcrypt с salt factor 12
2. **API ключи**: Генерируются в формате UUID v4 с префиксом `chronos_`
3. **Валидация**: Все входящие данные валидируются с помощью Zod схем
4. **Аутентификация**: Обязательная для всех API endpoints кроме регистрации/входа

## Производительность

1. **Соединения**: Используется пул соединений MongoDB с кэшированием
2. **Индексы**: Созданы индексы для часто используемых запросов
3. **Batch операции**: Heartbeat'ы сохраняются пакетами через `insertMany`
4. **Агрегация**: Временные ряды строятся через агрегацию на уровне приложения
5. **Почасовая активность**: Автоматическое обновление через `updateFromHeartbeats` статический метод
6. **Интервалы**: Используется настраиваемый интервал (INTERVAL_SEC) для расчета активности

## Утилиты

### Функции времени (`/src/lib/utils/time.ts`)

- `normalizeTimestamp(timestamp)` - Нормализация временных меток (автоопределение миллисекунд/секунд)
- `toHourStart(timestamp)` - Выравнивание к началу часа
- `toHourEnd(timestamp)` - Выравнивание к концу часа

### Функции heartbeat (`/src/lib/utils/heartbeat.ts`)

- `calculateActiveTime(heartbeats, start, end)` - Расчет активного времени на основе heartbeat'ов и интервалов

### Статические методы моделей

- `HourlyActivity.updateFromHeartbeats(userId, start, end)` - Автоматическое обновление почасовой активности из heartbeat'ов
- `User.findByApiKey(apiKey)` - Поиск пользователя по API ключу

## Миграции

Проект не использует формальную систему миграций. Изменения схемы применяются через обновление Mongoose моделей и валидационных схем.
