'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
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

export const ChartLineMultiple: FC<Props> = ({
  chartConfig,
  chartData,
  title,
  formatValue,
  description,
}) => {
  const configArray = Object.entries(chartConfig);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={true}
              content={(props: CustomTooltipProps) => (
                <ChartTooltipContent {...props} indicator="dot" valueFormatter={formatValue} />
              )}
            />
            {configArray.map(([key, config]) => (
              <Line
                dataKey={key}
                key={`line-${key}`}
                type="bump"
                stroke={config.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
