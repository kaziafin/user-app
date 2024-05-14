import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ onAddUser, onUpdateUser, editingUser }) => {
  const [formState, setFormState] = useState({
    id: null,
    username: '',
    email: '',
    role: 'user',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormState(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formState.username) errors.username = 'Username is required';
    if (!formState.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formState.email)) errors.email = 'Email is invalid';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (formState.id === null) {
      onAddUser({ ...formState, id: Date.now() });
    } else {
      onUpdateUser(formState);
    }

    setFormState({ id: null, username: '', email: '', role: 'user' });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
        </label>
        {errors.username && <p className="error-text">{errors.username}</p>}
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>
      <div>
        <label>
          Role:
          <select name="role" value={formState.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      </div>
      <button type="submit" className="submit-button">
        {formState.id === null ? 'Add User' : 'Update User'}
      </button>
    </form>
  );
};

UserForm.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  editingUser: PropTypes.object,
};

UserForm.defaultProps = {
  editingUser: null,
};

export default UserForm;
