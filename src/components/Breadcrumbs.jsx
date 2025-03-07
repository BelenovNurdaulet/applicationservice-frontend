import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    return (
        <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
            {pathSnippets.map((snippet, index) => (
                <Breadcrumb.Item key={index}>{snippet}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
