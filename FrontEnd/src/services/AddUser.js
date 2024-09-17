export const handleSubmit = async (e, formData) => {
    e.preventDefault();

    const data = {
        name: formData.name,
        personal_no: formData.personal_no,
        surname: formData.surname,
        birthday: formData.birthday,
        phone_number_1: formData.phone_number_1,
        address_1: formData.address_1,
        postal_code_1: formData.postal_code_1,
        address_2: formData.address_2,
        country: formData.country,
        position: formData.position,
        department: formData.department,
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/employers/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('User added successfully');
    } catch (error) {
        console.error('Error:', error);
    }
};
