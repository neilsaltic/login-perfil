// src/service/auth.ts
import { api } from "../lib/axios";
import type { LoginFormData } from "../schema/LoginSchema";

interface TokenResponse {
  access_token: string;
  token_type: string;
  user_role: string;
  user_name: string;
}

export const authService = {
  login: async (datos: LoginFormData): Promise<TokenResponse> => {
    const respuesta = await api.post<TokenResponse>("/auth/login", {
      email: datos.email,
      password: datos.password,
    });
    return respuesta.data;
  },
};
