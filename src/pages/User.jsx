import { useEffect, useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const User = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + "/user/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Не удалось получить информацию о пользователе");

                const data = await response.json();
                setUser(data);
            } catch (error) {
                notification.error({
                    message: "Ошибка",
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!user) {
        return <div>Не удалось получить данные пользователя</div>;
    }

    return (
        <div>
            <h2>Информация о пользователе</h2>
            <p><strong>Имя:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Вы можете добавить другие данные пользователя */}
        </div>
    );
};

export default User;
