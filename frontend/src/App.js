import React from "react";
import Home from "./Pages/Home";
import Multiplayer from "./Pages/Multiplayer";
import { Switch, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Multiplayer" component={Multiplayer} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
