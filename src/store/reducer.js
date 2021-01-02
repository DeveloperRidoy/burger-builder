import * as actionTypes from './actions';


const initialState = {

  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
    return state
} 


export default reducer;