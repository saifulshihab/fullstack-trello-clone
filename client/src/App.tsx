import ReactModal from 'react-modal';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Board from './Pages/Board';
import Boards from './Pages/Boards';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PageNotFound from './Pages/PageNotFound';
import PrivateRoute from './utils/PrivateRoute';

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
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/boards" component={Boards} />
          <PrivateRoute path="/b/:boardId" component={Board} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
