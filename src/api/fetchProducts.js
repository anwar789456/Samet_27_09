import axios from 'axios';

export const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:5000/get-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

/*
import axios from 'axios';

export const fetchProducts = async () => {
    try {
        const response = await axios.get('http://51.91.56.10/api/get-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
*/