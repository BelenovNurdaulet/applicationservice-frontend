import {validateLoginForm, validateRegistrationForm, validateRequestForm} from "./validationHelper.js";

export const handleFormSubmit = async (values, form, setLoading, setErrors, openNotification) => {
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

export const handleLogin = async (values, setLoading, openNotification, navigate) => {
    if (!validateLoginForm(values, openNotification)) return;

    setLoading(true);
    try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        if (response.status === 401 || response.status === 500) {
            openNotification("error", "Ошибка авторизации", "Неверный логин или пароль.");
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            openNotification("error", "Ошибка", data.message || "Неизвестная ошибка.");
            return;
        }

        localStorage.setItem("token", data.token);
        openNotification("success", "Успешный вход", "Добро пожаловать!");
        navigate("/");
    } catch (error) {
        openNotification("error", "Ошибка подключения", "Не удалось подключиться к серверу.");
    } finally {
        setLoading(false);
    }
};

export const handleRegister = async (values, setLoading, openNotification, navigate) => {
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
        setTimeout(() => navigate("/login"), 1000);

    } catch (error) {
        openNotification("error", "Ошибка подключения", "Не удалось подключиться к серверу.");
    } finally {
        setLoading(false);
    }
};
