type Actions = {
  toggle: () => void;
  close: () => void;
  open: () => void;
};
type AuthTokenType = {
  token_type: string;
  expires_in: number;
  scope: string;
  access_token: string;
  id_token: string;
  refresh_token: string;
  issued: number;
};

export type { Actions, AuthTokenType };
