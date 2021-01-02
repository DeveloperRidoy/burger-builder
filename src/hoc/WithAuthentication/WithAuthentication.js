import React, { useState, useEffect } from 'react'
import { auth } from '../../components/Firebase/Firebase';


export const Context = React.createContext();

const WithAuthentication = (props) => {

   

    const initialState = {
      uid: null,
      email: "",
      password: "",
      loggedIn: false,
      loading: false,
      error: false,
      errorMsg: "",
      totalPrice: 4
    };

    const [authState, setauthState] = useState(initialState);

    const burgerIngredientsInfo = {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    };

    
    const [burgerIngredientsState, setBurgerIngredientsState] = useState(burgerIngredientsInfo) 

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user && !authState.loggedIn && setauthState({...authState, loggedIn: true})
            !user && authState.loggedIn && setauthState({ ...authState, loggedIn: false })
            user && authState.email === '' && setauthState({ ...authState, email: user.email })
            user && authState.uid !== user.uid && setauthState({...authState, uid: user.uid})
        })
    },[authState])
   
    

    return (
        <Context.Provider value={[authState, setauthState, burgerIngredientsState, setBurgerIngredientsState]}>
            {props.children} 
        </Context.Provider>
    )
}

export default WithAuthentication
