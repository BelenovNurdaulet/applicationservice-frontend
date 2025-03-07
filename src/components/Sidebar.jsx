import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const {Sider} = Layout;

const Sidebar = () => {
    return (
        <Sider collapsible>
         <Menu theme="dark" mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">Главная</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    <Link to="/register">Регистрация</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<LoginOutlined />}>
                    <Link to="/login">Вход</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
