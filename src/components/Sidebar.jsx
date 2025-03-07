import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {

            fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Ошибка получения данных о пользователе');
                    }
                })
                .then((data) => {

                    setIsAuthenticated(true);
                    setUserName(data.login);
                })
                .catch((error) => {
                    console.error(error);
                    setIsAuthenticated(false);
                    setUserName('');
                });
        }
    }, []);

    const handleLogout = () => {

        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserName('');
    };

    return (
        <Sider collapsible>
            <Menu theme="dark" mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">Главная</Link>
                </Menu.Item>

                {!isAuthenticated ? (
                    <>
                        <Menu.Item key="2" icon={<UserOutlined />}>
                            <Link to="/register">Регистрация</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<LoginOutlined />}>
                            <Link to="/login">Вход</Link>
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.SubMenu key="profile" icon={<UserOutlined />} title={userName}>
                            <Menu.Item key="4">
                                <Link to="/user">Личный кабинет</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/requests">Мои запросы</Link>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<LogoutOutlined />} onClick={handleLogout}>
                                Выйти
                            </Menu.Item>
                        </Menu.SubMenu>
                    </>
                )}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
