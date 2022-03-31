import useSWR from "swr";
import storage from "./storage";

const STORAGE_KEY = "/favorites";

const fetcher = storage.getItem;

const makeMatchDelegate = (type: string, id: string) => (f: Favorite) =>
  f.type === type && f.id === id;
const makeInverseMatchDelegate = (type: string, id: string) => (f: Favorite) =>
  f.type !== type || f.id !== id;

function toggle(type: string, id: string, value?: boolean) {
  return (favorites: Favorite[]) => {
    const index = favorites.findIndex(makeMatchDelegate(type, id));
    const add = () =>
      storage.setItem(STORAGE_KEY, [
        ...favorites,
        {
          type,
          id,
        },
      ]);
    const remove = () =>
      storage.setItem(
        STORAGE_KEY,
        favorites.filter(makeInverseMatchDelegate(type, id))
      );
    if (value === true) {
      add();
    } else if (value === false) {
      remove();
    } else if (index === -1) {
      add();
    } else {
      remove();
    }
  };
}

export function useFavorites(): UseFavoritesReturnValue {
  const { data, mutate } = useSWR(STORAGE_KEY, fetcher);
  return {
    favorites: data || [],
    isFavorited: (type, id) => Boolean(data?.find(makeMatchDelegate(type, id))),
    toggleFavorite: (type, id, value) =>
      mutate(toggle(type, id.toString(), value)),
  };
}

export function useFavorite(type: string, id: string): UseFavoriteReturnValue {
  const { data, mutate } = useSWR(STORAGE_KEY, fetcher);
  return {
    isFavorited: Boolean(data?.find(makeMatchDelegate(type, id))),
    toggleFavorite: (value) => mutate(toggle(type, id.toString(), value)),
  };
}

export type Favorite = { type: string; id: string };
export type UseFavoritesReturnValue = {
  favorites: Favorite[];
  isFavorited: (type: string, id: string) => boolean;
  toggleFavorite: ToggleFavoriteFn;
};
export type UseFavoriteReturnValue = {
  isFavorited: boolean;
  toggleFavorite: BoundToggleFavoriteFn;
};
export type ToggleFavoriteFn = (
  type: string,
  id: string,
  value?: boolean
) => Promise<any>;
export type BoundToggleFavoriteFn = (value?: boolean) => Promise<any>;
