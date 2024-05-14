import React from 'react';
import PropTypes from 'prop-types';

const UserCard = ({ user, onEditUser, onDeleteUser }) => {
  return (
    <div className="user-card">
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <div className="user-card-actions">
        <button onClick={() => onEditUser(user)} className="edit-button">Edit</button>
        <button onClick={() => onDeleteUser(user.id)} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onEditUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default UserCard;
