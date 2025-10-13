[**next-chronos**](../../../../../README.md)

***

[next-chronos](../../../../../README.md) / [lib/mongoose/models/user](../README.md) / UserModel

# Interface: UserModel

Defined in: [src/lib/mongoose/models/user.ts:93](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/mongoose/models/user.ts#L93)

## Extends

- `Model`\<[`UserDoc`](../type-aliases/UserDoc.md), \{ \}, [`UserMethods`](../type-aliases/UserMethods.md)\>

## Constructors

### Constructor

> **new UserModel**\<`DocType`\>(`doc?`, `fields?`, `options?`): `Document`\<`unknown`, \{ \}, [`UserDoc`](../type-aliases/UserDoc.md), \{ \}, \{ \}\> & `Omit`\<[`UserDoc`](../type-aliases/UserDoc.md) & `Required`\<\{ \}\> & `object`, `"comparePassword"`\> & [`UserMethods`](../type-aliases/UserMethods.md)

Defined in: [src/lib/mongoose/models/user.ts:93](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/mongoose/models/user.ts#L93)

#### Parameters

##### doc?

`DocType`

##### fields?

`any`

##### options?

`boolean` | `AnyObject`

#### Returns

`Document`\<`unknown`, \{ \}, [`UserDoc`](../type-aliases/UserDoc.md), \{ \}, \{ \}\> & `Omit`\<[`UserDoc`](../type-aliases/UserDoc.md) & `Required`\<\{ \}\> & `object`, `"comparePassword"`\> & [`UserMethods`](../type-aliases/UserMethods.md)

#### Inherited from

`mongoose.Model<UserDoc, {}, UserMethods>.constructor`

## Properties

### findByApiKey()

> **findByApiKey**: (`apiKey`) => `Promise`\<[`UserDoc`](../type-aliases/UserDoc.md) \| `null`\>

Defined in: [src/lib/mongoose/models/user.ts:94](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/mongoose/models/user.ts#L94)

#### Parameters

##### apiKey

`string`

#### Returns

`Promise`\<[`UserDoc`](../type-aliases/UserDoc.md) \| `null`\>
