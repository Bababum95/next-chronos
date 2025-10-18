import type { OpUnitType } from 'dayjs';

export type ISOUnitType = OpUnitType | 'isoWeek';

export type TimeRangeItem = {
  value: ISOUnitType;
  label: string;
};
