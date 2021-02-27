import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Explore from "./components/Explore";
import Favorites from "./components/Favorites";
import Header from "./components/Header";
import Search from "./components/Search";
import { FavoriteContextProvider } from "./FavoriteContext";

function App() {
  return (
    <FavoriteContextProvider>
      <Router>
        <div className="background"></div>
        <div className="app">
          <div className="appBorder">
            <Header />
            <Switch>
              <Route path="/" exact render={(props) => <Explore {...props} />} />
              <Route path="/favorites" render={(props) => <Favorites {...props} />} />
              <Route path="/search" render={(props) => <Search {...props} />} />
            </Switch>
          </div>
        </div>
      </Router>
    </FavoriteContextProvider>
  );
}

export default App;
