[**next-chronos**](../../../../../README.md)

***

[next-chronos](../../../../../README.md) / [lib/mongoose/models/hourly-activity](../README.md) / HourlyActivityModel

# Interface: HourlyActivityModel

Defined in: [src/lib/mongoose/models/hourly-activity.ts:38](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/mongoose/models/hourly-activity.ts#L38)

## Extends

- `Model`\<[`HourlyActivityDoc`](../type-aliases/HourlyActivityDoc.md)\>

## Constructors

### Constructor

> **new HourlyActivityModel**\<`DocType`\>(`doc?`, `fields?`, `options?`): `Document`\<`unknown`, \{ \}, [`HourlyActivityDoc`](../type-aliases/HourlyActivityDoc.md), \{ \}, \{ \}\> & [`HourlyActivityDoc`](../type-aliases/HourlyActivityDoc.md) & `object` & `object`

Defined in: [src/lib/mongoose/models/hourly-activity.ts:38](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/mongoose/models/hourly-activity.ts#L38)

#### Parameters

##### doc?

`DocType`

##### fields?

`any`

##### options?

`boolean` | `AnyObject`

#### Returns

`Document`\<`unknown`, \{ \}, [`HourlyActivityDoc`](../type-aliases/HourlyActivityDoc.md), \{ \}, \{ \}\> & [`HourlyActivityDoc`](../type-aliases/HourlyActivityDoc.md) & `object` & `object`

#### Inherited from

`Model<HourlyActivityDoc>.constructor`

## Properties

### updateFromHeartbeats()

> **updateFromHeartbeats**: (`userId`, `start`, `end`) => `Promise`\<`void`\>

Defined in: [src/lib/mongoose/models/hourly-activity.ts:39](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/lib/mongoose/models/hourly-activity.ts#L39)

#### Parameters

##### userId

`ObjectId`

##### start

`number`

##### end

`number`

#### Returns

`Promise`\<`void`\>
