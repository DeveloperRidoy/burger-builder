import React from 'react'
import classes from './Button.module.scss'

const Button = (props) => (
    <button className={
        [classes.Btn, classes[props.btnType]].join(' ')
    }
        onClick={props.clicked}
    >{props.children}</button>
)


export default Button;