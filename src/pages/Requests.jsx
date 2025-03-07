import React, { useEffect, useState } from "react";
import { Table, notification } from "antd";
import { useNotificationHandler } from "../helpers/notificationHelper";
import { useNavigate } from "react-router-dom";

const Request = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { openNotification } = useNotificationHandler();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(import.meta.env.VITE_API_URL + "/applications/get", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    openNotification("error", "Ошибка", "Не удалось загрузить данные.");
                    return;
                }

                const result = await response.json();
                if (result.isSuccess && result.value) {
                    setData(result.value);
                } else {
                    openNotification("error", "Ошибка", "Не удалось получить данные.");
                }
            } catch (error) {
                openNotification("error", "Ошибка подключения", "Не удалось подключиться к серверу.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };


    const getUniqueValues = (key) => {
        return [...new Set(data.map(item => item[key]))].map(value => ({ text: value, value }));
    };

    const columns = [
        {
            title: "Имя",
            dataIndex: "fullName",
            key: "fullName",
            filters: getUniqueValues("fullName"),
            onFilter: (value, record) => record.fullName.includes(value),
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
            sortDirections: ["descend"],
        },
        {
            title: "Телефон",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            filters: getUniqueValues("phoneNumber"),
            onFilter: (value, record) => record.phoneNumber.includes(value),
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            filters: getUniqueValues("email"),
            onFilter: (value, record) => record.email.includes(value),
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "Дата создания",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => formatDate(text),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <div style={{ padding: "24px", minHeight: "100vh", background: "#fff" }}>
            <h2>Запросы</h2>
            <Table
                dataSource={data}
                columns={columns}
                loading={loading}
                onChange={onChange}
                rowKey="requestId"
                pagination={{ pageSize: 10 }}
                showSorterTooltip={{ target: "sorter-icon" }}

            />
        </div>
    );
};

export default Request;
