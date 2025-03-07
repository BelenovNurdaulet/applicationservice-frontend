import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
    return <Footer style={{ textAlign: "center" }}>© {new Date().getFullYear()} applicationservice</Footer>;
};

export default AppFooter;
