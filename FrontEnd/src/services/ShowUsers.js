// src/utils/api.js
export const fetchUsers = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/employers/get/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
