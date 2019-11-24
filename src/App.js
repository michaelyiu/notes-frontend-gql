import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";

import PrivateRoute from './components/common/PrivateRoute';

import Hello from './Hello';

import Landing from "./components/layout/Landing";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Notes from "./components/notes/Notes";

import AuthContextProvider from './contexts/AuthContext';


import SideNav from './components/layout/SideNav';

import "./App.css";

const App = () => {


  return (
    <div className="App">
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <Router>
            {/* <div className="flex-container"> */}
            <SideNav />
            <div className="page-content">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/notes" component={Notes} />
              </Switch>
            </div>

          </Router>
        </AuthContextProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;