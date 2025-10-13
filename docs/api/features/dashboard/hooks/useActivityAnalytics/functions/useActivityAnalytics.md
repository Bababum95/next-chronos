[**next-chronos**](../../../../../README.md)

***

[next-chronos](../../../../../README.md) / [features/dashboard/hooks/useActivityAnalytics](../README.md) / useActivityAnalytics

# Function: useActivityAnalytics()

> **useActivityAnalytics**(): `object`

Defined in: [src/features/dashboard/hooks/useActivityAnalytics.ts:26](https://github.com/Bababum95/next-chronos/blob/41860730c8dd12c16699269e1eee86402c8d1a9f/src/features/dashboard/hooks/useActivityAnalytics.ts#L26)

## Returns

`object`

### isLoading

> **isLoading**: `boolean`

### onChangeTimeRange()

> **onChangeTimeRange**: (`value`) => `void`

#### Parameters

##### value

`string`

#### Returns

`void`

### period

> **period**: \{ `formatted`: `string`; `range`: `"Today"` \| `"Week"` \| `"Month"` \| `undefined`; \} \| `null`

### projectActivity

> **projectActivity**: `object`

#### projectActivity.chartConfig

> **chartConfig**: [`ChartConfig`](../../../../../components/ui/chart/type-aliases/ChartConfig.md)

#### projectActivity.chartData

> **chartData**: `object`[]

### timeRange

> **timeRange**: `"day"` \| `"isoWeek"` \| `"month"`

### timeRanges

> **timeRanges**: readonly \[\{ `label`: `"Today"`; `value`: `"day"`; \}, \{ `label`: `"Week"`; `value`: `"isoWeek"`; \}, \{ `label`: `"Month"`; `value`: `"month"`; \}\] = `DASHBOARD_CONSTANTS.TIME_RANGES`

### totalTimeStr

> **totalTimeStr**: `string` \| `undefined` = `data.data.totalTimeStr`

### workActivity

> **workActivity**: [`WorkActivityData`](../../../types/type-aliases/WorkActivityData.md)
