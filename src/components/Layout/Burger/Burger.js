import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.scss'
import Spinner2 from '../UI/Spinner/Spinner2/Spinner2';
const Burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => [...Array(props.ingredients[igKey])]
            .map((_,index) => <BurgerIngredient key={igKey + index} type={igKey}/>)
        )
        .reduce((arr,ingredient) => arr.concat(ingredient),[])

    if (props.loading) {
        transformedIngredients = <Spinner2/>
    }else if (transformedIngredients.length == 0) {
        transformedIngredients = <div>Please add some ingredients first!</div>
    }
    
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default Burger;