'use client';

import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '../validation';

type Option = { value: string; label: string };
type SelectApiResponse = ApiResponse<{
  items: Option[];
  total: number;
  page: number;
  limit: number;
}>;

type Props = {
  resource: string;
  filter?: string[];
  value?: string;
};

export const useSelect = ({ resource, filter, value }: Props) => {
  const { isLoading, data } = useQuery<SelectApiResponse>({
    queryKey: [`/${resource}/select`],
  });

  return {
    isLoading,
    options: data?.data?.items.filter(({ value }) => !filter?.includes(value)) ?? [],
  };
};
