import axios from "axios";
import { User } from "../interface";

export const getAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};
export const getUser = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const editUser = async (id: string, data: any) => {
    try {
        const response = await axios.put(`http://localhost:3000/users/${id}`, data);
        getAllUsers()
        return response.status;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};
export const createUser = async (data: any) => {
    try {
        const response = await axios.post(`http://localhost:3000/users`, data);
        getAllUsers()
        return response.status;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};
export const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(`http://localhost:3000/users/${id}`);
        getAllUsers()
        return response.status;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};