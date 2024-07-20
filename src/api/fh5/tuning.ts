import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { CreateContent } from '@/api/CRUD/create';
import { UpdateContent } from '@/api/CRUD/update';

type Response = {
  message: string;
};

export const createTuningFH5 = CreateContent<TuningEditSchema, Response>;

export const updateTuningFH5 = UpdateContent<TuningEditSchema, Response>;
