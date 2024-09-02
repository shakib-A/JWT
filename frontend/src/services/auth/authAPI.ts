import { app } from "../axiosConfig";

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await app.post("/login", { email, password });
    return response.data;
  },
  signUp: async (email: string, password: string) => {
    const response = await app.post("/signup", { email, password });
    return response.data;
  },
};
