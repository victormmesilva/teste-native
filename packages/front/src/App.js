import { useEffect, useContext, useState } from "react";
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
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => console.log('effect-messages', messages), [messages]);

  useEffect(() => {
    const client = new WebSocket('ws://localhost:8000');
    client.onopen = () => console.log('WEB SOCKET BOMBANDO');
    client.onmessage = ({ data }) => setMessages((oldMessages) => [...oldMessages, data]);
  }, []);

  return (
    <Router>
      <Context.Provider value={{ messages, setMessages }}>
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
      </Context.Provider>
    </Router>
  );
}

export default App;
