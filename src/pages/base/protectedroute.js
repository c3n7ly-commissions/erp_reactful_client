import React, { useState } from 'react';
import { Redirect, Route } from 'react-router';
import auth from '../../utils/auth/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const successCallback = (response) => {
    console.log(response);
    setIsAuthenticated(true);
  };
  const errorCallback = (error) => {
    console.log(error);
    setIsAuthenticated(false);
  };
  auth.checkIfAuthenticated(successCallback, errorCallback);

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
