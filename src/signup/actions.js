import { SIGNUP_REQUESTING } from "./constants";

export const signupRequest = ({ email, password}) => {
  return {
    type: SIGNUP_REQUESTING,
    email,
    password
  }
};
