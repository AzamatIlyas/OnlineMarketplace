import React, { useEffect, useState, useRef } from "react";

interface Message {
    id?: number;
    sender_id: number;
    text: string;
    created_at?: string;
}

interface ChatProps {
    chatId: number;
    userId: number;
}

const Chat: React.FC<ChatProps> = ({ chatId, userId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const wsRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Загружаем историю
    useEffect(() => {
        fetch(`http://localhost:8000/chats/${chatId}/messages`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setMessages(data));
    }, [chatId]);

    // WebSocket
    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/chats/ws/${chatId}`);
        wsRef.current = ws;

        ws.onmessage = (event) => {
            const msg: Message = JSON.parse(event.data);
            setMessages((prev) => [...prev, msg]);
        };

        return () => ws.close();
    }, [chatId]);

    // Автопрокрутка
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        wsRef.current?.send(JSON.stringify({ text: input }));
        setInput("");
    };

    return (
        <div style={styles.container}>
            <div style={styles.messages}>
                {messages.map((msg, i) => {
                    const isMine = msg.sender_id === userId;

                    return (
                        <div
                            key={i}
                            style={{
                                ...styles.messageBubble,
                                alignSelf: isMine ? "flex-end" : "flex-start",
                                backgroundColor: isMine ? "#C8E6C9" : "#FFFFFF",
                                borderColor: isMine ? "#4CAF50" : "#ddd",
                            }}
                        >
                            {msg.text}
                            {msg.created_at && (
                                <div style={styles.time}>
                                    {new Date(msg.created_at).toLocaleTimeString()}
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div style={styles.inputContainer}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={styles.input}
                    placeholder="Введите сообщение..."
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
        fontFamily: "Arial, sans-serif",
    },
    messages: {
        flex: 1,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        overflowY: "auto",
        backgroundColor: "#F5F5F5",
    },
    messageBubble: {
        padding: "10px 14px",
        borderRadius: "16px",
        maxWidth: "70%",
        fontSize: "14px",
        lineHeight: "18px",
        border: "1px solid",
        position: "relative",
    },
    time: {
        fontSize: "10px",
        color: "#999",
        textAlign: "right",
        marginTop: "4px",
    },
    inputContainer: {
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ccc",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
    },
    button: {
        marginLeft: "10px",
        padding: "10px 16px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#4CAF50",
        color: "#fff",
        cursor: "pointer",
    },
};

export default Chat;
