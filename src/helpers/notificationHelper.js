import {notification} from "antd";

export const useNotificationHandler = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, title, description) => {
        api[type]({
            message: title,
            description,
            placement: "topRight",
        });
    };

    return { openNotification, contextHolder };
};