import { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../../api/services/auth/login-request.service";
import { AuthError } from "../../api/services/errors/auth.error";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const userData = await login({ email, password });
            localStorage.setItem("token", userData.token);

            alert("Login successful!");
        } catch (error) {
            if (error instanceof AuthError) {
                setError(error.message);
            } else {
                setError("Unexpected error when registering.");
            }
        }
    };

    return (
        <>
            <div className={styles.loginContainer}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Digite a sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </>
    );
}

export default Login;