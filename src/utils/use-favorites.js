import useSWR from "swr";
import storage from "./storage";

const fetcher = (key) => {
  const type = key.replace("/favorites/", "");
  const favorites = storage.getItem("favorites");
  return favorites[type];
};

const update = (type, updated) => {
  const favorites = storage.getItem("favorites");
  favorites[type] = updated;
  storage.setItem("favorites", favorites);
  return updated;
};

function toggle(type, id) {
  return (favorites) => {
    const set = new Set(favorites);
    if (set.has(id)) {
      set.delete(id);
    } else {
      set.add(id);
    }
    return update(type, [...set]);
  };
}

export function useFavorites(type) {
  const key = `/favorites/${type}`;
  const { data, mutate } = useSWR(key, fetcher);
  return {
    favorites: data || [],
    toggleFavorite: (id) => mutate(toggle(type, id.toString())),
  };
}

export function useFavorite(type, id) {
  const { data, mutate } = useSWR(`/favorites/${type}`, fetcher);
  return {
    isFavorited: data && data.includes(id.toString()),
    toggleFavorite: () => mutate(toggle(type, id.toString())),
  };
}
