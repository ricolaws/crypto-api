import React, { useState } from "react";
import { Route } from "react-router-dom";
import BrowseCoins from "./pages/BrowseCoins";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import { ACCOUNT_1 } from "./components/UserData";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [signedIn, setSignedIn] = useState(false);

  const routeChange = (path) => {
    history.push(path);
  };

  const signInHandler = (username, password) => {
    console.log(username, password);
    setSignedIn(true);
    routeChange("/dashboard");
  };

  return (
    <div className="app">
      <MainHeader signedIn={signedIn} />
      <Route path="/welcome">
        <Welcome onSignIn={signInHandler} />
      </Route>
      <Route path="/dashboard">
        <Dashboard account={ACCOUNT_1} />
      </Route>
      <Route path="/browse">
        <BrowseCoins />
      </Route>
    </div>
  );
}

export default App;
