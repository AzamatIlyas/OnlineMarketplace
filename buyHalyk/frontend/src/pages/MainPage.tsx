import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

export default function MainPage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: 50 }}>
            <h1>Welcome!</h1>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}
