import React, { Component } from 'react';
import classes from './App.module.scss';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Div from './Div/Div'

class App extends Component {

  render () {
    return (
      <Div>
        <div className={classes.app}>
          <Layout>
            <BurgerBuilder/>
          </Layout>
        </div>
      </Div>
    )
  }
}


export default App;