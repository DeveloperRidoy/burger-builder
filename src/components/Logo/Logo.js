import React from 'react'
import burgerLogo from '../../assets/images/Logo.png'
import classes from './logo.module.scss'


const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="burger logo"/>
    </div>
)


export default Logo;

