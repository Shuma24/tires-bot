export const adminCheck = (str: string, id: string) => {
  return str.split(',').includes(id);
};
