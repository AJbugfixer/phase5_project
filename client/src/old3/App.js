import React, { useEffect, } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Home from './page/Home'
import Products from './page/Products'
import Cart from './page/Cart'
import ProductDetails from './page/ProductDetails'
import Payment from './page/Payment'
import MyAccount from './page/MyAccount'
import EditAdd from './page/EditAdd'
import MyOrder from './page/MyOrder'
import Register from './page/Register'
import Login from './page/Login'
import Success from './page/Success'
import PayNow from './page/PayNow'
import AboutUs from './page/AboutUs'

import './App.css'
import { initialize } from './services/User'

const App = () => {
  useEffect(() => {
    if (!window.indexedDB) {
      return window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }

    (async () => {
      await initialize();
      // getUserFromDB();
    })();
  })

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/details/:id" component={ProductDetails} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/myaccount" component={MyAccount} />
        <Route exact path="/edit_address/:id" component={EditAdd} />
        <Route exact path="/myorder/:id" component={MyOrder} />
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/success" component={Success} />
        <Route exact path="/paynow/:pid" component={PayNow} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
