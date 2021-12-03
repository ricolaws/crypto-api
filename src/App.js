import React from "react";
import { Route } from "react-router-dom";
import BrowseCoins from "./pages/BrowseCoins";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import { ACCOUNT_1 } from "./components/UserData";

function App() {
  // const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="app">
      <MainHeader />
      <Route path="/welcome">
        <Welcome />
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
