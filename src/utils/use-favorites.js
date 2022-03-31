import useSWR from "swr";
import storage from "./storage";

const STORAGE_KEY = "/favorites";

const fetcher = (key) => storage.getItem(key, []);

const makeMatchDelegate = (type, id) => (f) => f.type === type && f.id === id;
const makeInverseMatchDelegate = (type, id) => (f) =>
  f.type !== type || f.id !== id;

function toggle(type, id, value) {
  return (favorites) => {
    const index = favorites.findIndex(makeMatchDelegate(type, id));
    const add = () =>
      storage.setItem(STORAGE_KEY, [
        ...favorites,
        {
          type,
          id,
        }
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

export function useFavorites() {
  const { data, mutate } = useSWR(STORAGE_KEY, fetcher);
  return {
    favorites: data || [],
    isFavorited: (type, id) => Boolean(data?.find(makeMatchDelegate(type, id))),
    toggleFavorite: (type, id, value) =>
      mutate(toggle(type, id.toString(), value)),
  };
}

export function useFavorite(type, id) {
  const { data, mutate } = useSWR(STORAGE_KEY, fetcher);
  return {
    isFavorited: Boolean(data?.find(makeMatchDelegate(type, id))),
    toggleFavorite: (value) => mutate(toggle(type, id.toString(), value)),
  };
}
