export type DataType = 'nation' | 'manufacturer' | 'car' | 'tag' | 'decal' | 'tagkind';

export type DataStatus = Record<DataType, number | undefined>;
