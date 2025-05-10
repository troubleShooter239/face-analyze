export interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}

export interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export type SignUpRequest = SignInRequest

export interface Token {
  token: string;
  token_type: string;
}
