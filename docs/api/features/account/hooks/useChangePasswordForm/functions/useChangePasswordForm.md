[**next-chronos**](../../../../../README.md)

***

[next-chronos](../../../../../README.md) / [features/account/hooks/useChangePasswordForm](../README.md) / useChangePasswordForm

# Function: useChangePasswordForm()

> **useChangePasswordForm**(): `object`

Defined in: [src/features/account/hooks/useChangePasswordForm.ts:41](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/features/account/hooks/useChangePasswordForm.ts#L41)

## Returns

`object`

### confirmPassword

> **confirmPassword**: `string` = `state.data.confirmPassword`

### currentPassword

> **currentPassword**: `string` = `state.data.currentPassword`

### error

> **error**: `string` \| `null` = `state.error`

### fieldErrors

> **fieldErrors**: `Record`\<`string`, `string`\> = `state.fieldErrors`

### isLoading

> **isLoading**: `boolean` = `state.isLoading`

### newPassword

> **newPassword**: `string` = `state.data.newPassword`

### resetForm()

> **resetForm**: () => `void`

#### Returns

`void`

### submitForm()

> **submitForm**: () => `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

### success

> **success**: `boolean` = `state.success`

### updateField()

> **updateField**: (`field`, `value`) => `void`

#### Parameters

##### field

keyof `ChangePasswordFormData`

##### value

`string`

#### Returns

`void`
