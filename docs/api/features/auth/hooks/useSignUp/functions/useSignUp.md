[**next-chronos**](../../../../../README.md)

***

[next-chronos](../../../../../README.md) / [features/auth/hooks/useSignUp](../README.md) / useSignUp

# Function: useSignUp()

> **useSignUp**(): `object`

Defined in: [src/features/auth/hooks/useSignUp.ts:40](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/features/auth/hooks/useSignUp.ts#L40)

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

> **formData**: `SignUpFormData`

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

> **isLoading**: `boolean` = `signUpMutation.isPending`

#### state.success

> **success**: `boolean` = `signUpMutation.isSuccess`

### updateField()

> **updateField**: (`field`, `value`) => `void`

#### Parameters

##### field

keyof `SignUpFormData`

##### value

`string` | `boolean`

#### Returns

`void`
