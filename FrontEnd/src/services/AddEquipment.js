// equipmentService.js
export const fetchEmployers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/employers/getname/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching employer data:', error.message);
      throw error;
    }
  };
  
  export const submitEquipmentData = async (dataToSubmit) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/equipment/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result; 
    } catch (error) {
      console.error('Error submitting equipment data:', error.message);
      throw error; 
    }
  };

  export const submitModel = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/model/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result; 
    } catch (error) {
      console.error('Error submitting equipment data:', error.message);
      throw error; 
    }

  }

  export const getCount = async() => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/model/get/count/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching model data:', error.message);
      throw error;
    }
  }
  
  export const fetchModel = async (type) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/model/${type}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching model data:', error.message);
      throw error;
    }
  };
  

  export const fetchModelCount = async (model) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/equipment/count/${model}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data.count;
    } catch (error) {
      console.error('Error fetching model count:', error.message);
    }
  };
  