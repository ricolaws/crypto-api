import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import BrowseCoins from "./pages/BrowseCoins";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import { ACCOUNT_1 } from "./components/UserData";
import { useHistory } from "react-router-dom";
import { colorList, colorPatterns } from "./theme/colorPatterns";
import { useSelector } from 'react-redux';


function App() {
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const [account, setAccount] = useState(ACCOUNT_1);

  const routeChange = (path) => {
    history.push(path);
  };

  useEffect(() => {
    if (isLoggedIn) {
      routeChange("/dashboard");
    }
  }, [isLoggedIn])


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
      <MainHeader />
      <Route path="/welcome">
        <Welcome />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          account={account}
          colors={colorList}
          colorPatterns={colorPatterns}
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
