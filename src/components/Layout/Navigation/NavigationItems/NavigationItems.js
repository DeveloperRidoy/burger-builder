import React from 'react'
import classes from './NavigationItems.module.scss'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <li className={classes.active}><a href="#">Burger Builder</a></li>
        <li><a href="#">Checkout</a></li>
    </ul>
)


export default NavigationItems;