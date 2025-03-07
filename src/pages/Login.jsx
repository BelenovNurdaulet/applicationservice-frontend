import { Form, Input, Button, Card, notification } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useNotificationHandler} from "../helpers/notificationHelper.js";
import {validateLoginForm} from "../helpers/validationHelper.js";
import AppFooter from "../components/Footer";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = useNotificationHandler();

    const onFinish = async (values) => {
        if (!validateLoginForm(values, openNotification)) return;

        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.status === 401 || response.status === 500) {
                openNotification("error", "Ошибка авторизации", "Неверный логин или пароль.");
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                openNotification("error", "Ошибка", data.message || "Неизвестная ошибка.");
                return;
            }

            openNotification("success", "Успешный вход", "Добро пожаловать!");
        } catch (error) {
            openNotification("error", "Ошибка подключения", "Не удалось подключиться к серверу.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {contextHolder}
            <Card title="Вход" style={{ width: 400 }}>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Логин" name="login">
                        <Input placeholder="Введите логин" />
                    </Form.Item>

                    <Form.Item label="Пароль" name="password">
                        <Input.Password placeholder="Введите пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: "center" }}>
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
