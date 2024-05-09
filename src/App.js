import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = (username, password) => {
    // Simulate login authentication - replace with actual authentication logic
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setRole('admin');
    } else if (username === 'user' && password === 'user') {
      setIsLoggedIn(true);
      setRole('user');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard role={role} onLogout={handleLogout} />
        </PrivateRoute>
        <PrivateRoute path="/users" role={role}>
          <UserList />
        </PrivateRoute>
        <PrivateRoute path="/create-user" role={role}>
          <CreateUser />
        </PrivateRoute>
        {/* <PrivateRoute path="/edit-user/:id" role={role}>
          <EditUser />
        </PrivateRoute> */}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ children, role, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        role ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default App;
