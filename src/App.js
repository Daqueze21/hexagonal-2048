import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import Game from './components/Game';

const GameWrapper = () => {
  const { hash } = useLocation();
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(hash.replace('#test', '') || 0);
  }, [hash]);

  return <Game size={size} />;
};

const App = () => (
  <Router>
    <Switch>
      <Route path='/'>
        <GameWrapper />
      </Route>
    </Switch>
  </Router>
);

export default App;
