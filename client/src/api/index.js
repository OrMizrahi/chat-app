import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

export const login = async (userName, password) => {
    const response = await axiosInstance.post('user/login', {
        userName,
        password,
    });
    return response.data;
};
export const createUser = async (user) => {
    const response = await axiosInstance.post('user/register', user);
    return response.data;
};
export const deleteUser = async (token, deleteUserId) => {
    const response = await axiosInstance.post('user/deleteUser', {
        deleteUserId,
        token,
    });
    return response.data;
};
export const getUserByToken = async (token) => {
    //verify token exist if not return null
    if (!token) return { code: 0, errorMessage: 'you must enter token' };
    const response = await axiosInstance.post('user/getUserByToken', { token });
    return response.data;
};

export const getUsers = async (token, query = {}) => {
    //verify token exist if not return null
    if (!token) return { code: 0, errorMessage: 'you must enter token' };
    const response = await axiosInstance.post('user/getUsers', {
        token,
        query,
    });
    return response.data;
};

export const getRooms = async (query = {}) => {
    const response = await axiosInstance.post('room/getRooms', { query });
    return response.data;
};

export const createRoom = async (token, roomName) => {
    const response = await axiosInstance.post('room/addRoom', {
        token,
        roomName,
    });
    return response.data;
};

export default axiosInstance;
