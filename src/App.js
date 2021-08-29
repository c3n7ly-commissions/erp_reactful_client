import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInScreen from './pages/auth/SignIn';
import { DashboardScreen1 } from './pages/dashboards/DashboardScreen1';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><SignInScreen /></Route>
        <Route path="/dashboard_screen_1"><DashboardScreen1 /></Route>
      </Switch>
    </Router>
  );
}

export default App;
