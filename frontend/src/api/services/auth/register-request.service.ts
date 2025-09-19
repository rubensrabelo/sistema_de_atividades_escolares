import ENV from "../../../configs/env.config";
import type { RegisterRequest } from "../../interface/register-request.interfce";
import { AuthError } from "../errors/auth.error";

export async function register(data: RegisterRequest) {
  const response = await fetch(`${ENV.API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.message || "Registro falhou.";
    throw new AuthError(message, response.status);
  }

  return response.json();
}
