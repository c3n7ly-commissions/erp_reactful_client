import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DashboardScreen1 } from './pages/dashboards/DashboardScreen1';
import ProtectedRoute from './pages/base/protectedroute';

import SignInScreen from './pages/auth/SignIn';
import BlankScreen01 from './pages/base/blank01';
import DivisionsListing from './pages/company/divisions/divisionslisting';
import DivisionsAdd from './pages/company/divisions/divisionsadd';
import DivisionView from './pages/company/divisions/divisionview';
import DivisionEdit from './pages/company/divisions/divisionedit';
import BranchesListing from './pages/company/branches/brancheslisting';
import BranchView from './pages/company/branches/branchview';
import BranchesAdd from './pages/company/branches/branchesadd';

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
        <ProtectedRoute exact path="/divisions/add" component={DivisionsAdd} />
        <ProtectedRoute
          exact
          path="/divisions/view/:id"
          component={DivisionView}
        />
        <ProtectedRoute
          exact
          path="/divisions/edit/:id"
          component={DivisionEdit}
        />

        <ProtectedRoute exact path="/branches" component={BranchesListing} />
        <ProtectedRoute exact path="/branches/add" component={BranchesAdd} />
        <ProtectedRoute
          exact
          path="/branches/view/:id"
          component={BranchView}
        />
      </Switch>
    </Router>
  );
}

export default App;
