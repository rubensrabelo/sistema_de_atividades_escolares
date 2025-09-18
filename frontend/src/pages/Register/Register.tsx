import styles from "./Register.module.css";

function Register() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Registro realizado com sucesso.");
    };

    return (
        <>
            <div className={styles.registerContainer}>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="Digite o seu nome" required />
                    <input type="text" name="lastName" placeholder="Digite o seu sobrenome" required />
                    <input type="email" name="email" placeholder="Digite o seu email" required />
                    <input type="password" name="password" placeholder="Digite a sua senha" required />
                    <select required>
                        <option value="">Selecione o papel</option>
                        <option value="student">Aluno</option>
                        <option value="teacher">Professor</option>
                    </select>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </>
    );
}

export default Register;