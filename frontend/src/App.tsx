import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home/Home';
import ConferenceRoom from './pages/ConferenceRoom/ConferenceRoom';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:roomname" component={ConferenceRoom} />
      </Switch>
    </Router>
  )
}

export default App;
