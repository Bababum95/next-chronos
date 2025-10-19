import type { ApiResponse } from '@/lib/validation';

export type FavoriteItem = {
  _id: string;
  name: string;
};

export type FavoritesApiResponse = ApiResponse<FavoriteItem[]>;
