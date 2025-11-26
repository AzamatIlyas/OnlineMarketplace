import React, { useEffect, useState, useRef } from "react";

interface Message {
    id?: number;
    sender_id: number;
    text: string;
    created_at?: string;
}

interface ChatProps {
    chatId: number;
    userId: number; // нужно для определения, кто мы на фронте (для стилизации)
}

const Chat: React.FC<ChatProps> = ({ chatId, userId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const wsRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Создаём WS соединение
        const ws = new WebSocket(`ws://localhost:8000/chats/ws/${chatId}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onmessage = (event) => {
            try {
                const message: Message = JSON.parse(event.data);
                setMessages((prev) => [...prev, message]);
            } catch (e) {
                console.error("Invalid message format", e);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => {
            ws.close();
        };
    }, [chatId]);

    // Автопрокрутка при новых сообщениях
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const data = { text: input }; // только текст, sender_id сервер добавляет сам

        wsRef.current?.send(JSON.stringify(data));
        setInput("");
    };

    return (
        <div style={styles.container}>
            <div style={styles.messages}>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            ...styles.messageBubble,
                            alignSelf: msg.sender_id === userId ? "flex-end" : "flex-start",
                            backgroundColor: msg.sender_id === userId ? "#DCF8C6" : "#FFF",
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={styles.inputContainer}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={styles.input}
                    placeholder="Введите сообщение..."
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage} style={styles.button}>Отправить</button>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "400px",
        height: "600px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif"
    },
    messages: {
        flex: 1,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        overflowY: "auto",
        backgroundColor: "#F5F5F5"
    },
    messageBubble: {
        padding: "10px 14px",
        borderRadius: "16px",
        maxWidth: "70%",
        fontSize: "14px",
        lineHeight: "18px",
        border: "1px solid #ddd"
    },
    inputContainer: {
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ccc"
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px"
    },
    button: {
        marginLeft: "10px",
        padding: "10px 16px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#4CAF50",
        color: "#fff",
        cursor: "pointer",
    }
};

export default Chat;
