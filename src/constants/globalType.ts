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
  [key: string]: string;
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

export type Practitioner = {
  id?: number;
  dob: Date;
  contact: number;
  fullName: string;
  permanentAddress: string;
  temporaryAddress: string;
  isSpecialist: boolean;
  email: string;
  dateOfBirth: string;
  startTime: string;
  endTime: string;
  workingDays: number;
  photo: string;
};
