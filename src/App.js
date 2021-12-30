import React, { useState } from "react";
import { Route } from "react-router-dom";
import BrowseCoins from "./pages/BrowseCoins";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import { ACCOUNT_1 } from "./components/UserData";
import { useHistory } from "react-router-dom";
import { colorList, colorPatterns } from "./theme/colorPatterns";

function App() {
  const history = useHistory();
  const [signedIn, setSignedIn] = useState(false);
  const [account, setAccount] = useState(ACCOUNT_1);

  const routeChange = (path) => {
    history.push(path);
  };

  // console.log(colorList, colorPatterns);

  const signInHandler = (username, password) => {
    console.log(username, password);
    setSignedIn(true);
    routeChange("/dashboard");
  };

  const addTradeHandler = (trade) => {
    let newAssetData = account.assetData;

    const parts = trade.date.split("-");
    const d = new Date(+parts[0], parts[1] - 1, +parts[2], 12);

    const newMovement = {
      date: d,
      amount: Number(trade.amount),
      price: Number(trade.price),
    };

    const matchedIndex = account.assetData.findIndex(
      (asset) => asset.id === trade.id
    );

    newAssetData[matchedIndex].movements.push(newMovement);

    setAccount({
      ...account,
      assetData: newAssetData,
    });
  };

  return (
    <div className="app">
      <MainHeader signedIn={signedIn} />
      <Route path="/welcome">
        <Welcome onSignIn={signInHandler} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          account={account}
          colors={colorList}
          onAddTrade={addTradeHandler}
        />
      </Route>
      <Route path="/browse">
        <BrowseCoins />
      </Route>
    </div>
  );
}

export default App;
