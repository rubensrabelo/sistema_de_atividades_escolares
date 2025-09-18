import { Link } from "react-router-dom";
import styles  from "./Landing.module.css";

function Landing() {
    return (
        <>
            <div className={styles.homeContainer}>
                <h1>Bem-vindo</h1>
                <div className={styles.buttons}>
                    <Link to="/login" className={styles.btn}>Login</Link>
                    <Link to="/register" className={styles.btn}>Registro</Link>
                </div>
            </div>
        </>
    );
}

export default Landing;