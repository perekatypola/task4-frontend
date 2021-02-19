import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Auth from "./components/Auth";
import React from "react";
import UserPage from "./components/UserPage";
function App() {
    if(localStorage.getItem('jwt') && window.location.href !== '/user') //  !localStorage.getItem('') (null false undefined returns true)
        window.history.pushState({urlPath:'/user'},"",'/user')
    if(!localStorage.getItem('jwt') && window.location.href !== '/'){
        window.history.pushState({urlPath:'/'},"",'/')
    }
  return (
      <Router>
        <Switch>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/">
            <Auth />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
