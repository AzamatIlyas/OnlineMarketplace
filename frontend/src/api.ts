export const API_URL = "http://localhost:8000";

export async function registerUser(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error("Ошибка регистрации");
    return await res.json();
}

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Неверные данные");
    return await res.json();
}

export async function logoutUser() {
    await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
}

export async function getUserChats() {
    const response = await fetch(`${API_URL}/chats`, {
        method: "GET",
        credentials: "include", // если используешь cookies
    });

    if (!response.ok) {
        throw new Error("Ошибка при загрузке чатов");
    }

    return response.json();
}