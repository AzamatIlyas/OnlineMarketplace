import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser, getUserChats } from "../api";

interface Chat {
    id: number;
    ads_id: number;
    buyer_id: number;
    seller_id: number;
}

export default function MainPage() {
    const navigate = useNavigate();
    const [chats, setChats] = useState<Chat[]>([]);

    // Загружаем чаты пользователя при открытии страницы
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const data = await getUserChats();
                setChats(data);
            } catch (err) {
                console.error("Ошибка при загрузке чатов", err);
            }
        };

        fetchChats();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    const openChat = (chatId: number) => {
        navigate(`/chat/${chatId}`);
    };

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
