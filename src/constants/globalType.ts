export type Userlogin = {
  email: string;
  password: string;
};

export type ApiErrorResponse = {
  data: ApiData;
  message: string;
  status: number;
};

type ApiData = {
  info: string;
};

export type ApiResponse = {
  data: ApiData;
  message?: string;
  status: number;
};

export type Signup = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
