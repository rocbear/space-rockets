function deserialize(value: string | null) {
  if (!value) {
    return undefined;
  }
  let parsed;
  try {
    parsed = JSON.parse(value);
  } catch (e) {
    console.error(e);
    return undefined;
  }
  return parsed;
}

const setItem = (key: string, value: any) => {
  if (value === null || value === undefined) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return value;
};
const getItem = (key: string, defaultValue?: any) =>
  deserialize(localStorage.getItem(key)) || defaultValue;

const storage = {
  setItem,
  getItem,
};

export default storage;
