export const OAUTH_XBOX_CLIENT_ID = import.meta.env.VITE_OAUTH_XBOX_CLIENT_ID;

const _OAUTH_XBOX_SCOPE: string = import.meta.env.VITE_OAUTH_XBOX_SCOPE;

export const OAUTH_XBOX_SCOPE = _OAUTH_XBOX_SCOPE
  .split(',')
  .map((x) => x.trim())
  .join(' ');

export const OAUTH_XBOX_REFRESH_ENDPOINT = import.meta.env.VITE_OAUTH_XBOX_REFRESH_ENDPOINT;
