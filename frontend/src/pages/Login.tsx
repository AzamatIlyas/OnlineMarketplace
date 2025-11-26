import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // 👈 тот же файл стилей

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 422) {
                setError("Некорректные данные. Проверьте поля.");
                return;
            }

            if (!response.ok) {
                setError("Неверный логин или пароль");
                return;
            }

            navigate("/main");
        } catch {
            setError("Ошибка соединения с сервером");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Вход</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Войти</button>
                </form>
                {error && <p className="error">{error}</p>}
                <p className="switch">
                    Нет аккаунта?{" "}
                    <span onClick={() => navigate("/register")}>Зарегистрироваться</span>
                </p>
            </div>
        </div>
    );
}
