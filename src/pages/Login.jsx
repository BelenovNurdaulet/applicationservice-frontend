import { Form, Input, Button, Card, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotificationHandler } from "../helpers/notificationHelper.js";
import { validateLoginForm } from "../helpers/validationHelper.js";
import {handleLogin} from "../helpers/requestHelper.js";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = useNotificationHandler();
    const navigate = useNavigate();

    const onFinish = (values) => handleLogin(values, setLoading, openNotification, navigate);

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
