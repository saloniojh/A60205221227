import axios from 'axios';

const registerCompany = async (companyData) => {
  try {
    const response = await axios.post('http://20.244.56.144/test/register', companyData);
    console.log('Company registration successful:', response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error registering company:', error);
    throw error; // Handle or rethrow the error as needed
  }
};

export default registerCompany;