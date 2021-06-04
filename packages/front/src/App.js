import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { w3cwebsocket as WebSocket } from 'websocket';
import {
  Home,
  City,
  Customer,
  EditCustomer,
} from './pages';
import Context from './context';
import './App.scss';
import { ReactComponent as HomeIcon } from './assets/home-icon.svg';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = new WebSocket('ws://localhost:8000');
    client.onmessage = ({ data }) => setMessages((oldMessages) => [...oldMessages, data]);
  }, []);

  return (
    <Router>
      <Context.Provider value={{ messages, setMessages }}>
        <div>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">
                  <HomeIcon
                    className="icon"
                    width="24"
                    height="24"
                  />
                </Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/city/:city/customers" component={City} />
            <Route exact path="/customer/:id" component={Customer} />
            <Route path="/customer/:id/edit" component={EditCustomer} />
          </Switch>
        </div>
      </Context.Provider>
    </Router>
  );
}

export default App;
