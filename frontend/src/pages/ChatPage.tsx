import { useParams } from "react-router-dom";
import Chat from "../components/Chat";

const ChatPage = () => {
    const { chatId } = useParams<{ chatId: string }>();

    const userId = Number(localStorage.getItem("user_id")); // или из state/запроса

    return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "40px" }}>
            <Chat chatId={Number(chatId)} userId={userId} />
        </div>
    );
};

export default ChatPage;
