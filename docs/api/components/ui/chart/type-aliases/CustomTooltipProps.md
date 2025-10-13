[**next-chronos**](../../../../README.md)

***

[next-chronos](../../../../README.md) / [components/ui/chart](../README.md) / CustomTooltipProps

# Type Alias: CustomTooltipProps

> **CustomTooltipProps** = `TooltipContentProps`\<`ValueType`, `NameType`\> & `object`

Defined in: [src/components/ui/chart.tsx:29](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/components/ui/chart.tsx#L29)

## Type Declaration

### className?

> `optional` **className**: `string`

### color?

> `optional` **color**: `string`

### formatter()?

> `optional` **formatter**: (`value`, `name`, `item`, `index`, `payload`) => `React.ReactNode`

#### Parameters

##### value

`number` | `string`

##### name

`string`

##### item

`Payload`\<`number` \| `string`, `string`\>

##### index

`number`

##### payload

`ReadonlyArray`\<`Payload`\<`number` \| `string`, `string`\>\>

#### Returns

`React.ReactNode`

### hideIndicator?

> `optional` **hideIndicator**: `boolean`

### hideLabel?

> `optional` **hideLabel**: `boolean`

### indicator?

> `optional` **indicator**: `"line"` \| `"dot"` \| `"dashed"`

### labelClassName?

> `optional` **labelClassName**: `string`

### labelFormatter()?

> `optional` **labelFormatter**: (`label`, `payload`) => `React.ReactNode`

#### Parameters

##### label

`TooltipContentProps`\<`number`, `string`\>\[`"label"`\]

##### payload

`TooltipContentProps`\<`number`, `string`\>\[`"payload"`\]

#### Returns

`React.ReactNode`

### labelKey?

> `optional` **labelKey**: `string`

### nameKey?

> `optional` **nameKey**: `string`

### valueFormatter()?

> `optional` **valueFormatter**: (`value`) => `string`

#### Parameters

##### value

`number` | `string`

#### Returns

`string`
