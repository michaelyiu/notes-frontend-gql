import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";

import PrivateRoute from './components/common/PrivateRoute';

import Landing from "./components/layout/Landing";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Notes from "./components/notes/Notes";
import Note from './components/note/Note';

import AuthContextProvider from './contexts/AuthContext';
import NoteContextProvider from './contexts/NoteContext';
import NavContextProvider from './contexts/NavContext';


import SideNav from './components/layout/SideNav';

import "./css/App.css";
import "./css/Layout.css";
import "./css/Navbar.css";
import "./css/Notes.css";
import "./css/Form.css";

const App = () => {


  return (
    <div className="App">
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <NoteContextProvider>
            <NavContextProvider>
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
                  <Switch>
                    <PrivateRoute exact path="/note/:id" component={Note} />
                  </Switch>
                </div>

              </Router>.
            </NavContextProvider>

          </NoteContextProvider>
        </AuthContextProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;