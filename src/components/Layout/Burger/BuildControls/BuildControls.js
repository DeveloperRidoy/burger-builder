import React, { useContext } from 'react';
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'
import Spinner from '../../UI/Spinner/Spinner1/Spinner';
import { Context } from '../../../../hoc/WithAuthentication/WithAuthentication';
import { FaTrashAlt } from 'react-icons/fa';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Ceese', type:'cheese'},
    {label:'Meat', type:'meat'}
]

const BuildControls = (props) => {
  
  const [authState,] = useContext(Context)

  let innerSection = (
    <div className={classes.BuildControls}>
      {props.price > 4
        ? <FaTrashAlt size="50px" className={classes.resetBurger} onClick={props.resetBurger} />
        : null}
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
      {authState.loggedIn ? (
        <button
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.order}
        >
          ORDER NOW
        </button>
      ) : (
        <button className={classes.OrderButton} onClick={props.order}>
          SIGN UP TO ORDER
        </button>
      )}
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