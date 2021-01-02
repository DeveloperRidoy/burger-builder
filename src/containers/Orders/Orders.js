import React, { Component } from 'react'
import Order from '../../components/Layout/Order/Order';
import { auth, db } from '../../components/Firebase/Firebase';
import Spinner from '../../components/Layout/UI/Spinner/Spinner1/Spinner';





class Orders extends Component {

  

    state = {
        orders: [],
        loading: true,
    }
    
    componentDidMount () {
        
        auth.onAuthStateChanged(user => {
            const orders = [];
            db.collection("orders")
              .where("uid", "==", user.uid)
              .orderBy("orderedTime")
              .onSnapshot(
                (res) => {
                  res.docs.forEach((doc) =>
                    orders.push({ data: doc.data(), id: doc.id })
                  );
                  this.setState({ orders: orders, loading: false });
                },
                (err) => {
                  this.setState({ error: true, loading: false });
                  console.log(err.message);
                }
              );    
        }, err => {
                console.log(err);
                this.setState({error: true, loading: false})
        })
        
       
    }

    render () {
        const orders = this.state.loading
            ? <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}       ><Spinner /></div>
            : this.state.orders.length === 0 
            ? <div className="py-4 alert alert-secondary text-center">No orders yet</div> 
            : this.state.orders.map(order => <Order info={order.data} key={order.id} />)

        return (
            <div className="orders">
                <div className="col-11 col-md-6 mx-auto text-center text-md-left">
                   {orders}
                </div>
            </div>
        );
    }
}
 

export default Orders;