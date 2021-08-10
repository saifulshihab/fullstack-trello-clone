import React from 'react';
import ReactModal from 'react-modal';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Board from './Pages/Board';
import HomePage from './Pages/HomePage';
import PageNotFound from './Pages/PageNotFound';

ReactModal.setAppElement('#root');

const App = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div
        className="w-full flex-1"
        style={{ maxHeight: `calc(100% - 2.5rem)` }}
      >
        <Switch>
          <Route path="/boards" component={HomePage} />
          <Route path="/b/:boardId" component={Board} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
