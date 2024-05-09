import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from './api'; // Import API functions
import './app.css'; //

const Login = ({ isLoggedIn }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    try {
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.username || !newUser.email) {
        setErrorMessage('Please provide both username and email.');
        return;
      }
      await addUser(newUser);
      fetchUserData();
      setNewUser({ username: '', email: '', role: 'user' });
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      await updateUser(userId, updatedUserData);
      fetchUserData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUserData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-accounts">
      <h2>User Accounts</h2>
      {isLoggedIn && (
        <div className="add-user">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <select name="role" value={newUser.role} onChange={handleInputChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleAddUser}>Add User</button>
          <p className="error">{errorMessage}</p>
        </div>
      )}
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
            {isLoggedIn && (
              <>
                <button onClick={() => handleUpdateUser(user.id, { role: user.role === 'user' ? 'admin' : 'user' })}>
                  {user.role === 'user' ? 'Promote to Admin' : 'Demote to User'}
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Login;
