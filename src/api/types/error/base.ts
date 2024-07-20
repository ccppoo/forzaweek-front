import { HttpStatusCode } from 'axios';

type ErrorResponseBase = {
  code: HttpStatusCode;
  message: string;
};

export type { ErrorResponseBase };
