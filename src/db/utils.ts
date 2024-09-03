export const nestedKey = (base: string, fields: string[]) =>
  fields.map((field) => `${base}.${field}`);
