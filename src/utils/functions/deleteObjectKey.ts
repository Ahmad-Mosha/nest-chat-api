export function filterObject<T>(obj: T, key: string) {
  for (const i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (i == key) {
      delete obj[key];
    } else if (typeof obj[i] == 'object') {
      filterObject(obj[i], key);
    }
  }
  return obj;
}
