import React, { Component } from 'react'
import Div from '../Div/Div';
import Modal from '../../components/Layout/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, error) => {


    return class extends Component{

        state = {
            error: false
        }

        render () {
            
            return (
            <Div>
                <Modal
                    show={this.state.error}
                    clicked={() => { console.log('nani')}}
                >
                <h3 style={{ color: "red", textAlign: "center" }}>
                    Oops! something went wrong
                </h3>
                </Modal>
                <WrappedComponent {...this.props} />
            </Div>
            );
        }

    }
}

export default withErrorHandler
