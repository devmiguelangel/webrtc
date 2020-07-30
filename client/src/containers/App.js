import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import CreateRoom from '../components/CreateRoom';
import Room from '../components/Room';
// import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
