export const AuthHeaders = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};

export const ContentTypeHeader = {
  JSON: { 'Content-Type': 'application/json' },
  FORM: { 'Content-Type': 'multipart/form-data' },
};

export const API_HOST = import.meta.env.VITE_API_HOST;
export const API_IMAGE_UPLOAD_HOST = import.meta.env.VITE_API_IMAGE_UPLOAD_HOST;
export const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
