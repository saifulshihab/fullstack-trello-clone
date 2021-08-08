import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PageNotFound from './Pages/PageNotFound';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <div className="w-screen">
      <Navbar />
      <Switch>
        <Route path="/boards" component={HomePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
