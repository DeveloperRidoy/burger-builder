import  React, { Component, lazy, Suspense } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import WithAuthentication from './hoc/WithAuthentication/WithAuthentication';
import { auth } from './components/Firebase/Firebase';
import Spinner from './components/Layout/UI/Spinner/Spinner1/Spinner';
import classes from './App.module.scss'

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const Auth = lazy(() => import("./containers/Auth/Auth")); 


class App extends Component {

  state = {
    loggedIn: false,
    loading: true
  }
  
  componentDidMount () { 
    auth.onAuthStateChanged(user => {
      user !== null && !this.state.loggedIn && this.setState({ loggedIn: true })
      user === null && this.state.loggedIn && this.setState({ loggedIn: false }) 
      
      this.state.loading && this.setState({loading: false})
    }, err => {
        this.state.loading && this.setState({ loading: false })
        console.log(err);
    })
  }

  render () { 

    let routes = (
      <Switch>
        <Route path="/authenticate" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect from="/burger-builder" to="/" exact />
        <Redirect to='/'/>
      </Switch>
    )

    if (this.state.loggedIn) {
      routes = (
        <Switch>
          <Route path="/authenticate" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/user" exact component={Auth} />
          <Redirect from="/burger-builder" to="/" exact />
          <Redirect to="/" />
        </Switch>
      );
    }
      
  
    return this.state.loading ? (
      <div className={classes.fixedCenter}>
        <Spinner />
      </div>
    ) : (
      <BrowserRouter basename='/burger-builder'>
        <WithAuthentication>
          <Layout>
            <Suspense fallback>{routes}</Suspense>
          </Layout>
        </WithAuthentication>
      </BrowserRouter>
    );
  }
}


export default App;