import { useState } from "react";
import styles from "./Register.module.css";
import { register } from "../../api/services/auth/register-request.service";

function Register() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await register(form);
            alert("Registration completed successfully.");
        } catch (error) {
            setError("Error when registering");
        }
    };

    return (
        <>
            <div className={styles.registerContainer}>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Digite o seu nome"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Digite o seu sobrenome"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Digite o seu email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Digite a sua senha"
                        required
                    />
                    <select name="role" value={form.role} onChange={handleChange} required>
                        <option value="">Selecione o papel</option>
                        <option value="student">Aluno</option>
                        <option value="teacher">Professor</option>
                    </select>

                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </>
    );
}

export default Register;