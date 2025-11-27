import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { getAuthenticatedUser } from "../api";

const ChatPage = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const navigate = useNavigate();

    // Храним userId в состоянии
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Получаем ID пользователя с сервера
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getAuthenticatedUser();
                setUserId(user.id);
            } catch (error) {
                // Если не аутентифицирован, перенаправляем на логин
                console.error("Требуется аутентификация:", error);
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    if (isLoading) {
        return <div style={{ display: "flex", justifyContent: "center", paddingTop: "40px" }}>Загрузка чата...</div>;
    }

    if (userId === null) {
        // Защита, если загрузка закончилась, но ID нет (по идее, уже перенаправили)
        return null;
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "40px" }}>
            <Chat
                chatId={Number(chatId)}
                userId={userId} // Используем ID из состояния
            />
        </div>
    );
};

export default ChatPage;