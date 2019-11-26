import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../contexts/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const history = useHistory();

  if (isAuthenticated)
    history.push("/notes");
  return (
    <div className="landing">
      <div className="container">
        <div className="row">
          <div className="modal-box text-center">

            <h1>MyNotes</h1>
            <p>Note keeping app</p>
            <p>Please Register or sign in!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;