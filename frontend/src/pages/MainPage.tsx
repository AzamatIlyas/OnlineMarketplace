import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser, getUserChats, getAuthenticatedUser, type Chat } from "../api"; // Импорт всего необходимого

export default function MainPage() {
    const navigate = useNavigate();
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Загружаем чаты пользователя и проверяем аутентификацию
    useEffect(() => {
        const fetchChats = async () => {
            try {
                // Сначала проверяем аутентификацию
                await getAuthenticatedUser();

                // Если аутентификация прошла успешно, загружаем чаты
                const data = await getUserChats();
                setChats(data);
            } catch (err: any) {
                if (err.message === "Не аутентифицирован" || err.message === "Сессия истекла. Требуется повторный вход.") {
                    // Если ошибка 401/403, перенаправляем
                    navigate("/login");
                } else {
                    console.error("Ошибка при загрузке чатов:", err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchChats();
    }, [navigate]);

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    const openChat = (chatId: number) => {
        navigate(`/chat/${chatId}`);
    };

    if (isLoading) {
        return <div style={{ textAlign: "center", marginTop: 50 }}>Загрузка списка чатов...</div>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: 50 }}>
            <h1>Ваши чаты</h1>

            {/* Если чатов нет */}
            {chats.length === 0 && <p>У вас пока нет чатов</p>}

            {/* Список чатов */}
            <div style={{ marginTop: 20 }}>
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => openChat(chat.id)}
                        style={styles.chatItem}
                    >
                        💬 Чат #{chat.id}
                    </div>
                ))}
            </div>

            <button onClick={handleLogout} style={styles.logoutBtn}>
                Выйти
            </button>
        </div>
    );
}

const styles = {
    chatItem: {
        padding: "12px 20px",
        backgroundColor: "#f0f0f0",
        margin: "10px auto",
        borderRadius: 8,
        width: 300,
        cursor: "pointer",
        fontSize: 16,
        border: "1px solid #ccc"
    },
    logoutBtn: {
        marginTop: 30,
        padding: "10px 20px",
        fontSize: 16,
        cursor: "pointer",
        borderRadius: 6,
    }
};