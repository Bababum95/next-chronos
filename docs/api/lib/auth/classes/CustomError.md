[**next-chronos**](../../../README.md)

***

[next-chronos](../../../README.md) / [lib/auth](../README.md) / CustomError

# Class: CustomError

Defined in: [src/lib/auth.ts:90](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/auth.ts#L90)

## Extends

- `Error`

## Constructors

### Constructor

> **new CustomError**(`name`, `message`, `code?`, `details?`): `CustomError`

Defined in: [src/lib/auth.ts:91](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/auth.ts#L91)

#### Parameters

##### name

`string`

##### message

`string`

##### code?

`number`

##### details?

[`ValidationError`](../../validation/type-aliases/ValidationError.md)[]

#### Returns

`CustomError`

#### Overrides

`Error.constructor`

## Properties

### code?

> `optional` **code**: `number`

Defined in: [src/lib/auth.ts:94](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/auth.ts#L94)

***

### details?

> `optional` **details**: [`ValidationError`](../../validation/type-aliases/ValidationError.md)[]

Defined in: [src/lib/auth.ts:95](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/auth.ts#L95)

***

### name

> **name**: `string`

Defined in: [src/lib/auth.ts:92](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/auth.ts#L92)

#### Inherited from

`Error.name`
