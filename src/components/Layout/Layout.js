import React, { Component } from 'react';
import Div from '../../Div/Div';
import Toolbar from '../Layout/Navigation/Toolbar/ToolBar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  
  state = {
    showSideDrawer : false
  }

  sideDrawerClossedHandler = () => this.setState({ showSideDrawer : false });

  sideDrawerToggleHandler = () => this.setState((prevState) => {
    return { showSideDrawer: !prevState.showSideDrawer };
  }
  );

  render () {
    return (
      <Div>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClossedHandler}/>
        <main style={{ marginTop: "72px" }}>{this.props.children}</main>
      </Div>
    );
  }
}


export default Layout;