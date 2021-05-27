import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Home,
  City,
  Customer,
  EditCustomer,
} from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/city/:city" component={City} />
          <Route exact path="/customer/:id" component={Customer} />
          <Route path="/customer/:id/edit" component={EditCustomer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
