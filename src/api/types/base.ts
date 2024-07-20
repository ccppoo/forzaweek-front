import { HttpStatusCode } from 'axios';

type ResponseBase = {
  code: HttpStatusCode;
  message: string;
};

export type { ResponseBase };
