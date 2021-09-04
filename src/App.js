import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DashboardScreen1 } from './pages/dashboards/DashboardScreen1';
import ProtectedRoute from './pages/base/protectedroute';

import SignInScreen from './pages/auth/SignIn';
import BlankScreen01 from './pages/base/blank01';
import DivisionsListing from './pages/company/divisions/divisionslisting';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignInScreen />
        </Route>
        <ProtectedRoute
          exact
          path="/dashboard_screen_1"
          component={DashboardScreen1}
        />
        <ProtectedRoute exact path="/blank01" component={BlankScreen01} />
        <ProtectedRoute exact path="/divisions" component={DivisionsListing} />
      </Switch>
    </Router>
  );
}

export default App;
