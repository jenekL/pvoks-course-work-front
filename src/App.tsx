import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Accounts from './components/Accounts';
import Categories from './components/Categories';
import Operations from './components/Operations';
import Products from './components/Products';

export default function App() {
  return (
    <div className={"app"}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/accounts">Счета</Link>
            </li>
            <li>
              <Link to="/categories">Категории</Link>
            </li>
          </ul>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/accounts">
              <Accounts userId={1}/>
            </Route>
            <Route path="/categories">
              <Categories userId={1}/>
            </Route>
            <Route path="/operations/:accountId">
              <Operations/>
            </Route>
            <Route path="/products/:operationId">
              <Products/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}
