import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { CreateContent } from '@/api/CRUD/create';
import { UpdateContent } from '@/api/CRUD/update';

type Response = {
  message: string;
};

export const createTrackFH5 = CreateContent<TuningEditSchema, Response>;

export const updateTrackFH5 = UpdateContent<TuningEditSchema, Response>;
