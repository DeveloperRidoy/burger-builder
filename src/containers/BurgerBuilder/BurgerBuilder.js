import React, { Component } from 'react';
import Div from '../../Div/Div'
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls'
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Layout/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    ordered: false
  };

  addIngredient = (type) => {
    const oldIngredientCount = this.state.ingredients[type];
    const updatedIngredientCount = oldIngredientCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredientCount;

    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  RemoveIngredient = (type) => {
    const oldIngredientCount = this.state.ingredients[type];

    let updatedIngredientCount = oldIngredientCount - 1;
    if (updatedIngredientCount < 0) {
      updatedIngredientCount = 0;
    }
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredientCount;

    let updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    if (updatedPrice < 4) {
      updatedPrice = 4;
    }
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, count) => sum + count, 0);
    
    this.setState({ purchasable: sum > 0 });
    
  }

  updateOrderState = () => this.setState({ordered: !this.state.ordered}) 
  orderContinue = () => alert('you chose to continue');

  render () {

    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
      
    }

    return (
      <Div>
        <Modal show={this.state.ordered} hide={this.updateOrderState}>
          <OrderSummary ingredients={this.state.ingredients} orderCancel={this.updateOrderState}
          orderContinue={this.orderContinue} price={this.state.totalPrice}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls addIngredient={this.addIngredient} removeIngredient={this.RemoveIngredient} disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable}
        order={this.updateOrderState}/>
      </Div>
    )
  }
}


export default BurgerBuilder;