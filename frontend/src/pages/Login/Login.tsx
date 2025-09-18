import styles from "./Login.module.css";

function Login() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Login feito com sucesso!")
    };

    return (
        <>
            <div className={styles.loginContainer}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Digite seu email" required />
                    <input type="password" name="password" placeholder="Digite a sua senha" required />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </>
    );
}

export default Login;