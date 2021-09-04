import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import auth from '../../utils/auth/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // give benefit of doubt, assume the user is logged but check if authed first
  // the gist is assume the token is correct until proven otherwise
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const successCallback = (response) => {
    console.log('protected route: ', response);
    setIsAuthenticated(true);
  };
  const errorCallback = (error) => {
    console.log('protected route: ', error);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    auth.checkIfAuthenticated(successCallback, errorCallback);
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
