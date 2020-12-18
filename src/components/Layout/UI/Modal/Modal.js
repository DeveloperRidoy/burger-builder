import React, { Component } from 'react'
import classes from './Modal.module.scss'
import Div from '../../../../Div/Div'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return nextProps.show != this.props.show
  }

  render () {
    return (
      <Div>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100%)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} clicked={this.props.hide} />
      </Div>
    );
  }
}
 
     




export default Modal;