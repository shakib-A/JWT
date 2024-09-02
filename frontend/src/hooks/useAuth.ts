import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/auth/authAPI";
import { AxiosError } from "axios";

interface SignUpVariables {
  email: string;
  password: string;
}
interface LoginVariables extends SignUpVariables {}

export const useAddUser = () => {
  return useMutation({
    mutationFn: (vars: SignUpVariables) =>
      authApi.signUp(vars.email, vars.password),
    onError: (err: any) => {
      return err
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (vars: LoginVariables) =>
      authApi.login(vars.email, vars.password),
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
      return err.response?.data
    },
    onSuccess: () => {},
  });
};
