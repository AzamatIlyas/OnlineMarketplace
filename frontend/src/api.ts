export const API_URL = "http://localhost:8000";

export interface User {
    id: number;
    email: string;
    username: string;
}

export async function registerUser(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
    });
    if (!res.ok) throw new Error("Ошибка регистрации");
}

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Неверные данные");
}

export async function logoutUser() {
    await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
}

export async function getAuthenticatedUser(): Promise<User> {
    const res = await fetch(`${API_URL}/users/me/private`, {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 401 || res.status === 403) {
        throw new Error("Не аутентифицирован");
    }

    if (!res.ok) {
        throw new Error("Ошибка при получении данных пользователя");
    }

    return await res.json();
}

export interface Chat {
    id: number;
    ads_id: number;
    buyer_id: number;
    seller_id: number;
}

export async function getUserChats(): Promise<Chat[]> {
    const response = await fetch(`${API_URL}/chats`, {
        method: "GET",
        credentials: "include",
    });

    if (response.status === 401) {
        throw new Error("Сессия истекла. Требуется повторный вход.");
    }

    if (!response.ok) {
        throw new Error("Ошибка при загрузке чатов");
    }

    return response.json();
}