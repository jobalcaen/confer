import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home';
import ConferenceRoom from './pages/ConferenceRoom/ConferenceRoom';
import { createBrowserHistory } from 'history';


// https://medium.com/the-andela-way/understanding-the-fundamentals-of-routing-in-react-b29f806b157e

// https://www.freecodecamp.org/news/hitchhikers-guide-to-react-router-v4-4b12e369d10/

const history = createBrowserHistory();


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Home} history={history}/>
          <Route path="/:roomname" component={ConferenceRoom} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
