export const combineData = (data, {key, value}) => {
  const obj = data;
  obj[key] = value;
  return {...data, ...obj};
};
