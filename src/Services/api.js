import axios from 'axios';

export const getUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};


export const addUser = (user) => {
  // Simulate adding user to backend
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: user }), 500);
  });
};

export const updateUser = (user) => {
  // Simulate updating user in backend
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: user }), 500);
  });
};

export const deleteUser = (userId) => {
  // Simulate deleting user from backend
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: userId }), 500);
  });
};
