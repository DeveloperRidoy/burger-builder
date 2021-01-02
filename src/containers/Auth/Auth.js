import React, { useContext } from 'react'
import { FaEnvelopeOpenText, FaUnlock } from 'react-icons/fa'
import { auth } from '../../components/Firebase/Firebase';
import Spinner from '../../components/Layout/UI/Spinner/Spinner1/Spinner'
import classes from './Auth.module.scss'
import { Context } from '../../hoc/WithAuthentication/WithAuthentication';


const Auth = (props) => {
    
    const [state, setState,burgeringredients,] = useContext(Context);
    
    const inputChangeHandler = (e) => {
        if (e.target.getAttribute('name') === 'email') {setState({...state,email: e.target.value.trim()})}
        if (e.target.getAttribute('name') === 'password') {setState({...state,password: e.target.value.trim()})}
    }

    const signUp = (e) => {
        e.preventDefault();
        setState({...state,loading: true})
        auth.createUserWithEmailAndPassword(state.email, state.password)
            .then(() => {setState({...state, loading: false, error: false})})
            .catch(err => { console.log(err); setState({...state,loading: false, error: true, errorMsg: err.message})})
    } 

    const logIn = (e) => {
        e.preventDefault()
        setState({...state,loading: true})
        auth.signInWithEmailAndPassword(state.email, state.password)
            .then(() => {
                setState({ ...state, loading: false, error: false })

                switch (props.history.location.search) {
                    case '?forpurchase':
                        const queryParams = [];

                        for (let i in burgeringredients) {
                          queryParams.push(
                            `${encodeURIComponent(i)}=${encodeURIComponent(
                              burgeringredients[i]
                            )}`
                          );
                        }
                        queryParams.push(`price=${state.totalPrice}`);
                        const queryString = queryParams.join("&");

                        props.history.replace({
                          pathname: "/checkout",
                          search: `?${queryString}`,
                        });
                        break
                    case '':
                        props.history.replace('/')
                        break
                    default :
                }
                
             
            })
            .catch(err =>{ console.log(err); setState({...state,loading: false, error: true, errorMsg: err.message})})
    }

    const logOut = (e) => {
        e.preventDefault()
        setState({...state, loading: true})
        auth.signOut()
            .then(() => setState({ ...state, loading: false, error: false }))
            .catch(err => { console.log(err); setState({...state,loading: false, error: true, errorMsg: err.message})})
    }


    
        
        return  state.loading ? <div className={classes.fixedCenter}><Spinner/></div> : (
            <div className="Auth">
                <form className="col-11 col-md-6 mx-auto shadow-lg p-4 mt-5 rounded">
                    {state.loggedIn
                        ? <div className="py-4 h4">{state.email}</div>
                        : <div>
                            <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><FaEnvelopeOpenText/></div>
                        </div>
                        <input type="text" name="email" className="form-control" value={state.email} placeholder="Mail Address" onChange={inputChangeHandler} required/>
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><FaUnlock/></div>
                        </div>
                        <input type="password" minLength="5" name="password" className="form-control" value={state.password} placeholder="Password" onChange={inputChangeHandler} required/>
                    </div>
                        </div>
                    }
                    <div className="form-group">
                        {state.loggedIn ? <button className="btn btn-danger" onClick={logOut}>Log Out</button> : (
                            <div>
                                <button className="btn btn-success" onClick={signUp}>Sign Up</button>
                                <p className="px-4 d-inline-block">OR</p>
                                <button className="btn btn-secondary" onClick={logIn}>Log In</button>
                            </div>)}
                        {state.error ? <div className="text-danger">{state.errorMsg}</div> : null }
                    </div>
                </form>
            </div>
        )
    
}


export default Auth;