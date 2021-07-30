import React, { Component, useContext } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import ProfileSettings from './pages/ProfileSettings';
import AddToDo from './pages/AddToDo';
import MainHeader from './components/header/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <MainHeader />

      <Switch>
        {!authCtx.isLoggedIn &&
          <Route exact path="/">
            <Login />
          </Route>
        }

        {authCtx.isLoggedIn &&
          <Route path="/home">
            <Home items={[]} />
          </Route>
        }

        {authCtx.isLoggedIn &&
          <Route exact path="/profile">
            <Profile />
          </Route>
        }

        {authCtx.isLoggedIn &&
          <Route exact path="/to-do">
            <AddToDo />
          </Route>
        }

        {authCtx.isLoggedIn &&
          <Route path="/profile/settings">
            <ProfileSettings />
          </Route>
        }

        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
