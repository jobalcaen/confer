import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home/Home';
import ConferenceRoom from './pages/ConferenceRoom/ConferenceRoom';

// https://medium.com/the-andela-way/understanding-the-fundamentals-of-routing-in-react-b29f806b157e

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:roomname" component={ConferenceRoom} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
