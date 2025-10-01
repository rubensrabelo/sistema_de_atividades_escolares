import ENV from "../../../configs/env.config"
import type { LoginRequest } from "../../interface/login-request.interface";
import { parseErrorResponse } from "../../utils/parse-error-response";
import { AuthError } from "../errors/auth.error";

export async function login(data: LoginRequest) {
    const response = await fetch(`${ENV.API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const { message, status } = await parseErrorResponse(response);
        throw new AuthError(message, status);
    }

    return response.json();
}