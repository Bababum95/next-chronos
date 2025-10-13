[**next-chronos**](../../../../../README.md)

***

[next-chronos](../../../../../README.md) / [features/auth/hooks/useLogin](../README.md) / useLogin

# Function: useLogin()

> **useLogin**(): `object`

Defined in: [src/features/auth/hooks/useLogin.ts:28](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/features/auth/hooks/useLogin.ts#L28)

## Returns

`object`

### clearFieldError()

> **clearFieldError**: (`field`) => `void`

#### Parameters

##### field

`string`

#### Returns

`void`

### formData

> **formData**: `LoginFormData`

### handleSubmit()

> **handleSubmit**: (`e`) => `Promise`\<`void`\>

#### Parameters

##### e

`FormEvent`

#### Returns

`Promise`\<`void`\>

### resetForm()

> **resetForm**: () => `void`

#### Returns

`void`

### setFieldError()

> **setFieldError**: (`field`, `error`) => `void`

#### Parameters

##### field

`string`

##### error

`string`

#### Returns

`void`

### state

> **state**: `object`

#### state.error

> **error**: `string` \| `null`

#### state.fieldErrors

> **fieldErrors**: `Record`\<`string`, `string`\>

#### state.hasError

> **hasError**: `boolean`

#### state.isLoading

> **isLoading**: `boolean` = `loginMutation.isPending`

#### state.success

> **success**: `boolean` = `loginMutation.isSuccess`

### updateField()

> **updateField**: (`field`, `value`) => `void`

#### Parameters

##### field

keyof `LoginFormData`

##### value

`string` | `boolean`

#### Returns

`void`
