import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, RefreshTokenRequest, RefreshTokenResponse } from "@/types/dto";

export const authService = {
  login: (body: LoginRequest) =>
    apiFetch<LoginResponse>(endpoints.auth.login, { method: "POST", body, auth: false }),
  async register(req: RegisterRequest): Promise<RegisterResponse> {
    return apiFetch<RegisterResponse>(endpoints.auth.register, {
      method: "POST",
      body: req,
      auth: false,
    });
  },

  async refreshToken(req: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return apiFetch<RefreshTokenResponse>(endpoints.auth.refresh, {
      method: "POST",
      body: req,
      auth: false, // Don't send the expired access token here
    });
  },
};
