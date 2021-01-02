import React, { Component } from 'react';
import Div from '../../hoc/Div/Div';
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls'
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Layout/OrderSummary/OrderSummary'
import Spinner from '../../components/Layout/UI/Spinner/Spinner1/Spinner';
// import {db} from '../../components/Firebase/Firebase'
import { Context } from '../../hoc/WithAuthentication/WithAuthentication';


const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7,
}

class BurgerBuilder extends Component {
  
  static contextType = Context;
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    ordered: false,
    loading: false,
    error: false,
    burgerLoading: false ,
    BuildControlsLoading: true,
    loggedIn: false,
  };

  componentDidMount() {
    const [authState, ,ingredients,] = this.context;
    this.state.ingredients !== ingredients && this.setState({ingredients: ingredients})
    this.state.totalPrice !== authState.totalPrice && this.setState({totalPrice: authState.totalPrice})
  }

  componentWillUnmount () {   
    const [authState, setAuthState, , setIngredients] = this.context;
    setIngredients({ ...this.state.ingredients })
    setAuthState({...authState, totalPrice: this.state.totalPrice})
  }

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
  };

  updateOrderState = (type) => {
    const [authState,,,] = this.context;
    authState.loggedIn &&
      this.setState({
        ordered: type === 'hide' ? false: true,
        error: false,
        loading: false,
      });
    !authState.loggedIn && this.props.history.push({ pathname: '/authenticate', search: 'forpurchase' })
  };

  orderContinue = () => {
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      );
    }
    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
  };

  resetBurger = () => {
    const currentIngredients = { ...this.state.ingredients };
    for (let ingredient in currentIngredients) {
      currentIngredients[ingredient] = 0
    }
    this.setState({ingredients: currentIngredients, totalPrice: 4})
  }

  render () {

    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        orderCancel={() => this.updateOrderState('hide')}
        orderContinue={this.orderContinue}
        price={this.state.totalPrice}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Div>
        <Modal
          show={this.state.ordered}
          hide={() => this.updateOrderState('hide')}
          error={this.state.error}
        >
          {orderSummary}
        </Modal>
        <Burger
          ingredients={this.state.ingredients}
          loading={this.state.burgerLoading}
        />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.RemoveIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          order={this.updateOrderState}
          loading={this.state.burgerLoading}
          resetBurger={this.resetBurger}
        />
      </Div>
    );
  }
}


export default BurgerBuilder;