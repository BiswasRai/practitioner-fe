const v1Endpoints = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRACTITIONER: "/practitioner",
};

type Endpoint = {
  [key: string]: string;
};

const endpoints: Endpoint = {};

Object.entries(v1Endpoints).forEach(([key, value]) => {
  endpoints[key] = `/v1${value}`;
});

export default endpoints;
