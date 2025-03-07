import {Form, Input, Button, Card} from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useNotificationHandler} from "../helpers/notificationHelper.js";

import {handleRegister} from "../helpers/requestHelper.js";


const Register = () => {
    const [loading, setLoading] = useState(false);
    const { openNotification, contextHolder } = useNotificationHandler();

    const onFinish = (values) => handleRegister(values, setLoading, openNotification);

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