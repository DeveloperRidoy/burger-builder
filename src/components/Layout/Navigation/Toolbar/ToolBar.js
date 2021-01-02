import React from 'react'
import classes from './ToolBar.module.scss'
import Logo from '../../../Logo/Logo'
import NavItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { Link } from 'react-router-dom';

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <Link to="/">
      <Logo height="40px"/>
    </Link>
    <nav className={classes.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);


export default Toolbar;