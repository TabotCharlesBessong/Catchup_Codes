
interface NewUserResponse {
  id: string;
  name: string;
  email: string;
}

export type AuthStackParamList = {
  Signup: undefined;
  Signin: undefined;
  Forgot: undefined;
  Verification: {
    userInfo: NewUserResponse;
  };
};