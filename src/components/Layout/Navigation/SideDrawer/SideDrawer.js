import React from 'react'
import classes from './SideDrawer.module.scss'
import Logo from '../../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Div from '../../../../hoc/Div/Div'

const SideDrawer = (props) => {
    
  let attachClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <Div>
      <div className={attachClasses.join(' ')}>
        <Logo height="70px"  />
        <nav>
          <NavigationItems />
        </nav>
      </div>
      <Backdrop show={props.open} clicked={props.closed}/>
    </Div>
  );
}

export default SideDrawer;