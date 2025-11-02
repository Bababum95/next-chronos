import type { OpUnitType } from 'dayjs';

export type ISOUnitType = Exclude<OpUnitType, 'date' | 'dates'> | 'isoWeek';

export type TimeRangeItem = {
  value: ISOUnitType;
  label: string;
};
