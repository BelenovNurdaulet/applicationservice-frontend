import {Form, Input, Button, Card} from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useNotificationHandler} from "../helpers/notificationHelper.js";
import {validateRegistrationForm} from "../helpers/validationHelper.js";


const Register = () => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = useNotificationHandler();

    const onFinish = async (values) => {
        if (!validateRegistrationForm(values, openNotification)) return;

        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.status === 400) {
                openNotification("warning", "Ошибка регистрации", "Пользователь с таким логином или почтой уже существует");
                return;
            }

            const result = await response.json();

            if (!response.ok) {
                if (result.errors) {
                    Object.values(result.errors).forEach((error) =>
                        openNotification("info", "Ошибка валидации", error)
                    );
                } else if (result.message) {
                    openNotification("error", "Ошибка", result.message);
                } else {
                    openNotification("error", "Ошибка", "Что-то пошло не так. Попробуйте снова.");
                }
                return;
            }

            openNotification("success", "Регистрация успешна", "Теперь вы можете войти в систему.");
        } catch (error) {
            openNotification("error", "Ошибка подключения", "Не удалось подключиться к серверу.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {contextHolder}
            <Card title="Регистрация" style={{ width: 400 }}>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Логин" name="login">
                        <Input placeholder="Введите логин" />
                    </Form.Item>

                    <Form.Item label="Полное имя" name="fullName">
                        <Input placeholder="Введите полное имя" />
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input placeholder="Введите email" />
                    </Form.Item>

                    <Form.Item label="Пароль" name="password">
                        <Input.Password placeholder="Введите пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: "center" }}>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </div>
            </Card>

        </div>

    );
};

export default Register;
