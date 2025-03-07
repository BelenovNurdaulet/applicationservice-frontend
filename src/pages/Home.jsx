import { useEffect, useState } from "react";
import { Layout, Form, Input, Select, Button, notification } from "antd";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import AppFooter from "../components/Footer";

import { validateRequestForm } from "../helpers/validationHelper";
import {useNotificationHandler} from "../helpers/notificationHelper.js";

const { Header, Content } = Layout;
const { Option } = Select;

const Home = () => {
    const [types, setTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { openNotification, contextHolder } = useNotificationHandler();

    const [errors, setErrors] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesResponse, usersResponse] = await Promise.all([
                    fetch(import.meta.env.VITE_API_URL + "/api/info/types").then(res => res.json()),
                    fetch(import.meta.env.VITE_API_URL + "/api/info/users").then(res => res.json())
                ]);
                setTypes(typesResponse);
                setUsers(usersResponse);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
                openNotification("error", "Ошибка загрузки", "Не удалось загрузить данные");
            }
        };
        fetchData();
    }, []);

    const onFinish = async (values) => {

        const validationErrors = validateRequestForm(values, openNotification);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/applications/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error("Ошибка при отправке заявки");

            openNotification("success", "Успешно", "Заявка отправлена.");
            form.resetFields();
            setErrors({});
        } catch (error) {
            openNotification("error", "Ошибка", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {contextHolder}
            <Sidebar />
            <Layout>
                <Header style={{ padding: 0, background: "#fff" }} />
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumbs />
                    <div style={{ padding: 24, minHeight: 360, background: "#fff", borderRadius: 8 }}>
                        <h2>Оставить заявку</h2>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={({ errorFields }) => {
                                errorFields.forEach(({ errors }) => {
                                    errors.forEach((error) => {
                                        openNotification("info", "Ошибка валидации", error);
                                    });
                                });
                            }}
                        >
                            <Form.Item
                                label="ФИО"
                                name="fullName"
                                validateStatus={errors.fullName ? "error" : ""}
                                help={errors.fullName || ""}
                            >
                                <Input placeholder="Введите ФИО" />
                            </Form.Item>

                            <Form.Item
                                label="Телефон"
                                name="phoneNumber"
                                validateStatus={errors.phoneNumber ? "error" : ""}
                                help={errors.phoneNumber || ""}
                            >
                                <Input placeholder="Введите телефон" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                validateStatus={errors.email ? "error" : ""}
                                help={errors.email || ""}
                            >
                                <Input placeholder="Введите email" />
                            </Form.Item>

                            <Form.Item
                                label="Тип заявки"
                                name="requestTypeId"
                                validateStatus={errors.requestTypeId ? "error" : ""}
                                help={errors.requestTypeId || ""}
                            >
                                <Select placeholder="Выберите тип заявки">
                                    {types.map((type) => (
                                        <Option key={type.id} value={type.requestTypeId}>
                                            {type.typeName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Пользователь"
                                name="userId"
                                validateStatus={errors.userId ? "error" : ""}
                                help={errors.userId || ""}
                            >
                                <Select placeholder="Выберите пользователя">
                                    {users.map((user) => (
                                        <Option key={user.id} value={user.userId}>
                                            {user.fullName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Отправить заявку
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default Home;
