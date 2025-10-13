[**next-chronos**](../../../../../README.md)

***

[next-chronos](../../../../../README.md) / [features/account/hooks/useEditProfileForm](../README.md) / useEditProfileForm

# Function: useEditProfileForm()

> **useEditProfileForm**(): `object`

Defined in: [src/features/account/hooks/useEditProfileForm.ts:35](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/features/account/hooks/useEditProfileForm.ts#L35)

## Returns

`object`

### avatarUrl

> **avatarUrl**: `string` \| `undefined` = `user.avatarUrl`

### email

> **email**: `string` = `state.data.email`

### error

> **error**: `string` \| `null` = `state.error`

### fieldErrors

> **fieldErrors**: `Record`\<`string`, `string`\> = `state.fieldErrors`

### isLoading

> **isLoading**: `boolean` = `state.isLoading`

### name

> **name**: `string` = `state.data.name`

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

keyof `EditProfileFormData`

##### value

`string`

#### Returns

`void`
