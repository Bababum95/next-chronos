'use client';

import Link from 'next/link';
import { Pie, PieChart } from 'recharts';
import { FC, Fragment } from 'react';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CustomTooltipProps,
} from '@/components/ui/chart';
import {
  ItemGroup,
  Item,
  ItemSeparator,
  ItemMedia,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';

type LegendProps = {
  percentage?: number;
  backgroundColor: string;
  title: string;
  formatValue?: (value: number | string) => string;
  data: number | string;
  url?: string;
};

const Legend: FC<LegendProps> = ({
  percentage,
  backgroundColor,
  title,
  formatValue,
  data,
  url,
}) => {
  const content = (
    <Item size="xs">
      <ItemMedia className="!self-center">
        <div className="rounded-full size-3" style={{ backgroundColor }} />
      </ItemMedia>
      <ItemContent className="gap-0">
        <ItemTitle>{title}</ItemTitle>
      </ItemContent>
      {percentage && <span className="text-muted-foreground">{percentage}%</span>}
      <div className="min-w-[80px] text-right">{formatValue ? formatValue(data) : data}</div>
    </Item>
  );

  if (url) return <Link href={url}>{content}</Link>;

  return content;
};

type Props = {
  chartConfig: ChartConfig;
  formatValue?: (value: number | string) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: any[];
  dataKey: string;
  nameKey: string;
};

export const ChartPieDonut: FC<Props> = ({
  chartConfig,
  chartData,
  formatValue,
  dataKey,
  nameKey,
}) => {
  return (
    <div className="md:flex md:flex-row items-center">
      <ChartContainer config={chartConfig} className="max-h-[200px] aspect-square flex-1 mx-auto">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={(props: CustomTooltipProps) => (
              <ChartTooltipContent {...props} indicator="dot" valueFormatter={formatValue} />
            )}
          />
          <Pie data={chartData} dataKey={dataKey} nameKey={nameKey} innerRadius={48} />
        </PieChart>
      </ChartContainer>

      <ItemGroup className="flex-1">
        {chartData.map((data, index) => (
          <Fragment key={index}>
            <Legend
              backgroundColor={data.fill}
              title={data[nameKey]}
              percentage={data.percentage}
              formatValue={formatValue}
              data={data[dataKey]}
              url={data.url}
            />
            {index !== chartData.length - 1 && <ItemSeparator />}
          </Fragment>
        ))}
      </ItemGroup>
    </div>
  );
};
