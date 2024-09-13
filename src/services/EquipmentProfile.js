
export const fetchEquipmentBySerial = async (serial) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/equipment/${serial}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      throw error;
    }
  };
  

  export const fetchByID = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/employers/${id}/`)
      if(!response.ok){
        throw new Error('Failed to fetch data');
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching employers data:', error);
      throw error;
    }
  };