import React, { Component } from 'react'
import CheckoutSummary from '../../components/Layout/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.module.scss'
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ConactData/ContactData';
import { Context } from '../../hoc/WithAuthentication/WithAuthentication';



class Checkout extends Component {

    static contextType = Context
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 0
    }


    componentDidMount () {

        let ingredients = {};
        let totalPrice = 0;
        const query = new URLSearchParams(this.props.location.search);

        query.forEach((value, param) => {
            if (param === "price") {
            totalPrice = Number(value);
            } else {
            ingredients[param] = Number(value);
            }
        });

        this.setState({ ingredients: ingredients, totalPrice: totalPrice });    
        
        //redirect to burgerbuilder if burger has no ingredients
        Object.values(ingredients).every(item => item === 0) && this.props.history.replace('/')
       
    }

    checkoutCancelledHandler = () => this.props.history.goBack();

    checkoutContinuedHandler = () => this.props.history.replace("/checkout/contact-data");

    render () {
        return (
          <div className={classes.Checkout}>
            <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}    
            />
            <Route path={`${this.props.match.path}/contact-data`} exact render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>}/>
        </div>
        );
    }
}

export default Checkout