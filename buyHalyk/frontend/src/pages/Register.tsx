import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // 👈 подключаем стили

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: name, email, password }),
            });

            if (response.status === 422) {
                setError("Некорректные данные. Проверьте введённые поля.");
                return;
            }

            if (!response.ok) {
                setError("Ошибка регистрации. Попробуйте снова.");
                return;
            }

            navigate("/login");
        } catch {
            setError("Ошибка соединения с сервером");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Регистрация</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Имя пользователя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <button type="submit">Зарегистрироваться</button>
                </form>
                {error && <p className="error">{error}</p>}
                <p className="switch">
                    Уже есть аккаунт?{" "}
                    <span onClick={() => navigate("/login")}>Войти</span>
                </p>
            </div>
        </div>
    );
}
