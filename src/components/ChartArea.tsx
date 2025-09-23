'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import type { FC, ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CustomTooltipProps,
} from '@/components/ui/chart';

type Props = {
  title: string;
  description?: string;
  extra?: ReactNode;
  chartConfig: ChartConfig;
  formatValue?: (value: number | string) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartData: any[];
};

export const ChartArea: FC<Props> = ({
  title,
  description,
  chartConfig,
  chartData,
  extra,
  formatValue,
}) => {
  const configArray = Object.entries(chartConfig);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {extra}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              {configArray.map(([key, config]) => (
                <linearGradient
                  id={`fill-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  key={`gradient-${key}`}
                >
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={(props: CustomTooltipProps) => (
                <ChartTooltipContent {...props} indicator="line" valueFormatter={formatValue} />
              )}
            />
            {configArray.map(([key, config]) => (
              <Area
                key={`area-${key}`}
                dataKey={key}
                type="natural"
                fill={`url(#fill-${key})`}
                stroke={config.color}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
