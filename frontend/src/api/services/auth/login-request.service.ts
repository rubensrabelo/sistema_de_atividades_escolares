import ENV from "../../../configs/env.config"
import type { LoginRequest } from "../../interface/login-request.interface";
import { AuthError } from "../errors/auth.error";

export async function login(data: LoginRequest) {
    const response = await fetch(`${ENV.API_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    if(!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || "Login failed.";
        throw new AuthError(message, response.status);
    }        

    return response.json();
}