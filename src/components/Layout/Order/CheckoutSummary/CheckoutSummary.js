import React from 'react'
import classes from './CheckoutSummary.module.scss'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
      <div className={classes.CheckoutSummary}>
        <div className="p-4 text-center">
          <h1>We hope it tastes well!</h1>
          <div className="mx-auto w-100">
            <Burger ingredients={props.ingredients} />
          </div>
          <div className="">
            <Button btnType="Danger" clicked={props.checkoutCancelled}>
              CANCEL
            </Button> 
            <Button btnType="Success" clicked={props.checkoutContinued}>
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    );
}


export default CheckoutSummary;