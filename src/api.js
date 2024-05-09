import axios from 'axios';

// Mock API endpoint
const API_URL = 'https://api.example.com/users';

// Fetch users from the API
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new user
export const addUser = async (newUser) => {
  try {
    await axios.post(API_URL, newUser);
  } catch (error) {
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
  } catch (error) {
    throw error;
  }
};
