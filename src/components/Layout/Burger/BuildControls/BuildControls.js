import React from 'react';
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'
import Spinner from '../../UI/Spinner/Spinner1/Spinner';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Ceese', type:'cheese'},
    {label:'Meat', type:'meat'}
]

const BuildControls = (props) => {
  
  let innerSection = (
    <div className={classes.BuildControls}>
      <div className="">
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </div>
      {controls.map((control) => (
        <BuildControl
          label={control.label}
          key={control.label}
          addIngredient={() => props.addIngredient(control.type)}
          removeIngredient={() => props.removeIngredient(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.order}
      >
        ORDER NOW
      </button>
    </div>
  );
  
  if (props.loading) {
    innerSection = (
      <div className={classes.BuildControls}>
        <Spinner />
      </div>
    );
  }

  return innerSection;
}
  



export default BuildControls;