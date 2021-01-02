import React, { useContext } from 'react'
import classes from './NavigationItems.module.scss'
import { NavLink } from 'react-router-dom';
import { Context } from '../../../../hoc/WithAuthentication/WithAuthentication';
import { withRouter } from 'react-router-dom';

const NavigationItems = (props) => {
  
  const [authState,] = useContext(Context)

  return (
    <ul className={classes.NavigationItems}>
      <li>
        <NavLink to="/" exact activeClassName={classes.active} onClick={props.clicked}>Burger Builder</NavLink>
      </li>
      <li>
        {authState.loggedIn && <NavLink to="/orders" exact activeClassName={classes.active} onClick={props.clicked}>Orders</NavLink>}
      </li>
      <li>
        {authState.loggedIn
          ? <NavLink to="/user" exact activeClassName={classes.active} onClick={props.clicked}>User</NavLink>
          : <NavLink to="/authenticate" exact activeClassName={classes.active} onClick={props.clicked}>authenticate</NavLink>}
      </li>
    </ul>
  );
}

export default withRouter(NavigationItems);