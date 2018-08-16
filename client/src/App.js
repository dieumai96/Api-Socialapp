import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // decoded token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is authenticated 
  store.dispatch(setCurrentUser(decoded));
  // check for expired token /
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user 
    store.dispatch(logoutUser());
    // clear current profile 
    store.dispatch(clearCurrentProfile());
    // redirect login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
