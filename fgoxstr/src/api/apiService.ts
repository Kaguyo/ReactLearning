import axios from 'axios';

const API_URL = 'http://localhost:5067';

export const signUpUser = async (userData: { username: string, email: string, password: string, password2: string}) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during sign up:', error);
        throw error;
    }
};
