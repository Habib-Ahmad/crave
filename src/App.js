import {React, useState} from 'react'
import './App.css';
import Header from "./components/Header";
import Explore from './components/Explore';
import Search from './components/Search';
import Favorites from './components/Favorites'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { FavoriteProvider } from './FavoriteContext'

function App() {

  return (
    <FavoriteProvider>
      <Router>
        <div className="app">
          <div className="appBorder">
            <Header />
            <Switch>
              <Route path="/" exact render={props => <Explore {...props}/>} />
              <Route path="/favorites" render={props => <Favorites {...props} />} />
              <Route path="/search" render={props => <Search {...props} />} />
            </Switch>
          </div>
        </div> 
      </Router>
    </FavoriteProvider>
  );
}

export default App;
