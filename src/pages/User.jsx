import { useEffect, useState } from "react";
import { Layout, notification, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import AppFooter from "../components/Footer";
import {useAuth} from "../helpers/authHelper.js";

const { Header, Content } = Layout;

const User = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!dataLoaded) {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const fetchUserData = async () => {
                try {
                    const response = await fetch(import.meta.env.VITE_API_URL + "/user/me", {
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` },
                    });

                    if (!response.ok) throw new Error("Не удалось получить информацию о пользователе");

                    const data = await response.json();
                    setUser(data);
                    setDataLoaded(true);
                } catch (error) {
                    notification.error({ message: "Ошибка", description: error.message });
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, [navigate, dataLoaded]);

    const { handleLogout } = useAuth();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!user) {
        return <div>Не удалось получить данные пользователя</div>;
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout>
                <Header style={{ padding: 0, background: "#fff" }} />
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumbs />
                    <div style={{ padding: 24, minHeight: 360, background: "#fff", borderRadius: 8 }}>
                        <h2>Информация о пользователе</h2>
                        <p><strong>Логин:</strong> {user.login}</p>
                        <p><strong>Имя:</strong> {user.fullName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <Button type="primary" onClick={handleLogout} style={{ marginTop: 20 }}>
                            Выйти
                        </Button>
                    </div>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default User;