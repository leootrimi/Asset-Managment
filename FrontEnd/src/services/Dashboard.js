export const fetchCount = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/equipment/count/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching equipment data:', error.message);
        throw error;
    }
};

export const fetchTotal = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/equipment/total/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching equipment data:', error.message);
        throw error;
    }
};



