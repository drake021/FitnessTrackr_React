import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";


import {
    Login,
    Logout,
    Register,
    Header,
    Home,
    Routines,
    Myroutines,
    Activities
  } from './components';


  const App = () => {

    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (!!localUser) {
        setUser(localUser);
      }
    }, [setUser])
  
    return (
      <>
        <Header user={user} setUser={setUser} />
        <Route path='/login'>
          <Login setUser={setUser} user={user} />
        </Route>
        <Route path='/logout'>
          <Logout user={user} setUser={setUser} />
        </Route>
        <Route path='/register'>
          <Register setUser={setUser} user={user} />
        </Route>
        <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/routines'>
      <Routines setUser={setUser} user={user} />
      </Route>
      <Route exact path='/myroutines'>
      <Myroutines setUser={setUser} user={user} />
      </Route>
      <Route exact path='/activities'>
      <Activities setUser={setUser} user={user} />
      </Route>
    </>
    )
  }
  
  ReactDOM.render(
      <Router>
      <App />
      </Router>,
    document.getElementById('app')
  );