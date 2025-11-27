import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Предполагаем, что вы импортируете api

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await loginUser(email, password);
            // Если запрос успешен, сервер установил куку
            navigate("/main");
        } catch (err: any) {
            if (err.message === "Неверные данные") {
                setError("Неверный логин или пароль");
            } else {
                setError("Ошибка соединения с сервером");
            }
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