function deserialize(value) {
  let parsed;
  try {
    parsed = JSON.parse(value);
  } catch (e) {
    console.error(e);
    return undefined;
  }
  return parsed;
}

const setItem = (key, value) => {
  if (value === null || value === undefined) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return value;
};
const getItem = (key, defaultValue) =>
  deserialize(localStorage.getItem(key)) || defaultValue;

const storage = {
  setItem,
  getItem,
};

export default storage;
