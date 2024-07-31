type Actions = {
  toggle: () => void;
  close: () => void;
  open: () => void;
};
type AuthTokenType = {
  token_type: string | undefined;
  expires_in: number;
  scope: string | undefined;
  access_token: string | undefined;
  id_token: string | undefined;
  refresh_token: string | undefined;
  issued: number;
};

export type { Actions, AuthTokenType };
