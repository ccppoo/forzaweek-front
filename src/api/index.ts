export const AuthHeaders = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};

export const _TokenJSONBodyBase = {
  jsonrpc: '2.0',
  id: 1,
};

export const TokenJSONBody = {
  getBalance: (address: string) => {
    return {
      ..._TokenJSONBodyBase,
      method: 'eth_getBalance',
      params: [address, 'latest'],
    };
  },
};

export const ContentTypeHeader = {
  JSON: { 'Content-Type': 'application/json' },
};

export const API_HOST = import.meta.env.VITE_API_HOST;
export const API_IMAGE_UPLOAD_HOST = import.meta.env.VITE_API_IMAGE_UPLOAD_HOST;
export const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
