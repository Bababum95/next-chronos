[**next-chronos**](../../../README.md)

***

[next-chronos](../../../README.md) / [lib/validation](../README.md) / validateForm

# Function: validateForm()

> **validateForm**\<`T`\>(`data`, `validators`): `Record`\<`string`, `string`\>

Defined in: [src/lib/validation.ts:221](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/validation.ts#L221)

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

## Parameters

### data

`T`

### validators

`Partial`\<`Record`\<keyof `T`, (`value`) => [`FieldError`](../type-aliases/FieldError.md) \| `null`\>\>

## Returns

`Record`\<`string`, `string`\>
