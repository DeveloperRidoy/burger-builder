import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Spinner from '../../../components/Layout/UI/Spinner/Spinner2/Spinner2';
import { db } from '../../../components/Firebase/Firebase'
import { FaPhone, FaStreetView, FaShippingFast, FaFileArchive, FaEnvelopeOpenText } from 'react-icons/fa'
import { Context } from '../../../hoc/WithAuthentication/WithAuthentication';

class ContactData extends Component {

    static contextType = Context

    state = {
        name: '',
        email: '',
        uid: null,
        address: {
            postcode: '',
            street: ''
        },
        message: '',
        phone: '',
        deliveryMethod: '',
        loadng: false,
        error: false
    }

    formRef = React.createRef()
    
    componentDidMount () {
        const [authState, , ,] = this.context
        this.formRef.current.scrollIntoView()
        this.state.uid !== authState.uid && this.setState({uid: authState.uid})
    }

    inputHandler = (e) => {
        const input = e.target.getAttribute('name');

        // if (input === 'phone' && e.target.value.toString().length <=5) {
        //     console.log(e.target.value)
        // }
        input === 'name' && this.setState({ name: e.target.value })
        input === 'email' && this.setState({email : e.target.value})
        // input === 'phone' && this.setState({phone : e.target.value})
        input === 'delivery method' && this.setState({deliveryMethod : e.target.value})

        input === 'street' && this.setState(prevState => ({
            address: {...prevState.address, street: e.target.value}
        }))
        input === 'postal' && this.setState(prevState => ({
            address: {...prevState.address, postcode: e.target.value}
        }))
        input === "message" && this.setState({ message: e.target.value });
        

        if (input === 'phone' ) {
            const value = e.target.value;
            console.log(typeof vlaue );
            this.setState({phone: Number(value)})
        }
    }

    orderHandler = (e) => {
      e.preventDefault();

      this.setState({ loading: true });

    const order = {
        uid: this.state.uid,
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        customer: {
            name: this.state.name,
            address: {
            street: this.state.address.street,
            postcode: this.state.address.postcode,
          },
          phone: Number(this.state.phone),
          email: this.state.email,
        },
        deliveryMethod: this.state.deliveryMethod,
        message: this.state.message,
        orderedTime: new Date()
      };

      db.collection('orders')
        .doc()
        .set(order)
          .then(res => {
            this.setState({ loading: false });
            this.props.history.push('/')
        })
          .catch(err => {
              console.log(err);
              this.setState({ loading: false, error: true })
          });
        
    }
    


    render () {
        console.log(this.state.id)
        let form =  (
            <div className={classes.ContactData} ref={this.formRef}>
                <form className="col-11 col-md-6 mx-auto p-4 bg-dark shadow-lg rounded-lg mb-5" onSubmit={this.orderHandler} >
                    <p className="text-light text-center h4 mb-3">Enter your contact data</p>
                    <div className="form-row">
                        <div className="col-md-6 form-group">
                            <input type="text" name="name" className="form-control" placeholder="Your Name" onChange={this.inputHandler} required maxLength={Number(5)}/>
                        </div>
                        <div className="col-md-6 form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><FaEnvelopeOpenText/></div>
                                </div>
                                <input type="email" name="email" className="form-control" placeholder="Your Email" onChange={this.inputHandler} required/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><FaPhone/></div>
                            </div>
                            <input type="number" name="phone" className="form-control" placeholder="Phone Number" onChange={this.inputHandler} min="0" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><FaShippingFast/></div>
                            </div>
                            <select name="delivery method" className="form-control" onChange={this.inputHandler} value={this.state.deliveryMethod} required>
                            <option hidden value="">Delivery Method</option>
                            <option value="Normal">Normal</option>
                            <option value="Fast">Fast</option>
                            <option value="Fastest">Fastest</option>
                        </select>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><FaStreetView/></div>
                            </div>
                            <input type="text" name="street" className="form-control" placeholder="Street Name" onChange={this.inputHandler} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><FaFileArchive/></div>
                            </div>
                            <input type="number" name="postal" className="form-control" placeholder="Postal Code" onChange={this.inputHandler} min="0" required/>
                        </div> 
                    </div>
                    <div className="form-group">
                        <textarea name="message" rows="3" placeholder="Your message here..." className="form-control"  onChange={this.inputHandler} required></textarea>
                    </div>
                    <input type="submit" className="btn btn-success" value="Submit"/>
                </form>
            </div>
        )
             
        this.state.loading && (form = <Spinner/>)

        return (form)
    }
}

export default ContactData;