export const validateRegistrationForm = (values, openNotification) => {
    let isValid = true;

    if (!values.login) {
        openNotification("info", "Введите логин", "Поле логина не должно быть пустым.");
        isValid = false;
    } else if (values.login.length < 4 || values.login.length > 20) {
        openNotification("info", "Некорректный логин", "Логин должен содержать от 4 до 20 символов.");
        isValid = false;
    }

    if (!values.fullName) {
        openNotification("info", "Введите имя", "Поле имени не должно быть пустым.");
        isValid = false;
    } else if (values.fullName.length < 2 || values.fullName.length > 50) {
        openNotification("info", "Некорректное имя", "Имя должно содержать от 2 до 50 символов.");
        isValid = false;
    }

    if (!values.email) {
        openNotification("info", "Введите email", "Поле email не должно быть пустым.");
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        openNotification("info", "Некорректный email", "Введите корректный email (пример: example@mail.com).");
        isValid = false;
    }

    if (!values.password) {
        openNotification("info", "Введите пароль", "Поле пароля не должно быть пустым.");
        isValid = false;
    } else {
        if (values.password.length < 6) {
            openNotification("info", "Слишком короткий пароль", "Пароль должен содержать минимум 6 символов.");
            isValid = false;
        }
        if (!/[A-Z]/.test(values.password)) {
            openNotification("info", "Добавьте заглавную букву", "Пароль должен содержать хотя бы одну заглавную букву.");
            isValid = false;
        }
        if (!/[a-z]/.test(values.password)) {
            openNotification("info", "Добавьте строчную букву", "Пароль должен содержать хотя бы одну строчную букву.");
            isValid = false;
        }
        if (!/[0-9]/.test(values.password)) {
            openNotification("info", "Добавьте цифру", "Пароль должен содержать хотя бы одну цифру.");
            isValid = false;
        }
    }

    return isValid;
};

export const validateLoginForm = (values, openNotification) => {
    let isValid = true;

    if (!values.login) {
        openNotification("info", "Введите логин", "Поле логина не должно быть пустым.");
        isValid = false;
    }

    if (!values.password) {
        openNotification("info", "Введите пароль", "Поле пароля не должно быть пустым.");
        isValid = false;
    }

    return isValid;
};

export const validateRequestForm = (values, openNotification) => {
    let isValid = true;

    if (!values.fullName) {
        openNotification("info", "Введите ФИО", "Поле ФИО не должно быть пустым.");
        isValid = false;
    }

    if (!values.phoneNumber) {
        openNotification("info", "Введите телефон", "Поле телефона не должно быть пустым.");
        isValid = false;
    }

    if (!values.email) {
        openNotification("info", "Введите email", "Поле email не должно быть пустым.");
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        openNotification("info", "Некорректный email", "Введите корректный email (пример: example@mail.com).");
        isValid = false;
    }

    if (!values.requestTypeId) {
        openNotification("info", "Выберите тип заявки", "Поле типа заявки не должно быть пустым.");
        isValid = false;
    }

    if (!values.userId) {
        openNotification("info", "Выберите пользователя", "Поле пользователя не должно быть пустым.");
        isValid = false;
    }

    return isValid;
};

