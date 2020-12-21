import React, { Component } from 'react'
import Div from '../../../hoc/Div/Div'; 
import Button from '../UI/Button/Button'

class OrderSummary extends Component { 

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {this.props.ingredients[igKey]}
      </li>
    ));

    return (
      <Div>
        <h3 style={{ marginBottom: "1rem" }}>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul style={{ margin: "1rem 0 1rem 3rem" }}>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p style={{ margin: "0 0 1rem 0" }}>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.orderCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.orderContinue}>
          CONTINUE
        </Button>
      </Div>
    );
  }
    
}


export default OrderSummary;