import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.scss'

const Burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => [...Array(props.ingredients[igKey])]
            .map((_,index) => <BurgerIngredient key={igKey + index} type={igKey}/>)
        )
        .reduce((arr,ingredient) => arr.concat(ingredient),[])

    if (transformedIngredients.length === 0) {
        transformedIngredients = <div className='text-danger'>Please add ingredients</div>
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