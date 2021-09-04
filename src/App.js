import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInScreen from './pages/auth/SignIn';
import BlankScreen01 from './pages/base/blank01';
import { DashboardScreen1 } from './pages/dashboards/DashboardScreen1';
import ProtectedRoute from './pages/base/protectedroute';

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
      </Switch>
    </Router>
  );
}

export default App;
