import React, { Component } from 'react';
import Div from '../../hoc/Div/Div';
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls'
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Layout/OrderSummary/OrderSummary'
import firebase from 'firebase/app';
import 'firebase/firestore';
import Spinner from '../../components/Layout/UI/Spinner/Spinner1/Spinner';

const firebaseConfig = {
  apiKey: "AIzaSyCR7d3DYWezCYZi9YZemh3BZSIgVrIU32o",
  authDomain: "react-my-burger-45b03.firebaseapp.com",
  projectId: "react-my-burger-45b03",
  storageBucket: "react-my-burger-45b03.appspot.com",
  messagingSenderId: "920453383747",
  appId: "1:920453383747:web:b832b85942cbb706d1b6f6",
  measurementId: "G-EV7PTG2KLF",
};

//Initialize Firebase

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



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
    ordered: false,
    loading: false,
    error: false,
    burgerLoading: true,
    BuildControlsLoading: true
  };

  
  componentDidMount () {

    let currentIngredients = {};

    db.collection('ingredients')
      .doc('count')
      .onSnapshot(res => {
        for (let key in res.data()) {
          currentIngredients[key] = Number(res.data()[key]) 
        }
        this.setState({ingredients: currentIngredients, burgerLoading: false})
      })

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
    
  }

  updateOrderState = () => this.setState({ordered: !this.state.ordered, error: false, loading: false}) 
  

  orderContinue = () => {

    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Max Schwarzmuller",
        address: {
          street: "park street",
          zipcode: "4150",
          country: "Germany",
        },
        phone: 45445433,
        email: "maxschwarzmuller@gmail.com",
      },
      deliveryMethod: "Fastest"
    };

    db.collection('orders')
      .doc()
      .set(order)
      .then(res => this.setState({loading: false, ordered: false}))
      .catch(err => this.setState({loading: false,error: true}));
  }; 

  render () {

    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
      
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        orderCancel={this.updateOrderState}
        orderContinue={this.orderContinue}
        price={this.state.totalPrice}
      />
    );
    
    if (this.state.loading) {
      orderSummary = <Spinner/> 
    }
    

    return (
      <Div>
        <Modal show={this.state.ordered} hide={this.updateOrderState} error={this.state.error}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} loading={this.state.burgerLoading}/>
        <BuildControls addIngredient={this.addIngredient} removeIngredient={this.RemoveIngredient} disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable}
        order={this.updateOrderState} loading={this.state.burgerLoading}/>
      </Div>
    )
  }
}


export default BurgerBuilder;