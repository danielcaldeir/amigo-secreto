import { getToday } from "../utils/getToday";

export const validatePassword = (password: string): Boolean => {
    const currentPassword = getToday().split('/').join('');
    return (password === currentPassword);
}

export const createToken = (): String => {
    const currentPassword = getToday().split('/').join('');
    return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
}

export const validateToken = (token: string): Boolean => {
    const currentToken = createToken();
    return (token === currentToken);
}