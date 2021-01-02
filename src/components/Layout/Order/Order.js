import React from 'react'


const Order = (props) => {
    
    const ingredients = []; 
    for (let key in props.info.ingredients) {
        ingredients.push(
            <span className="p-1 bg-secondary  m-1 text-white rounded d-inline-block" key={key}>
                {key}({props.info.ingredients[key]})
            </span>);
    }
  const getOrderedTime = () => {
    const orderedAt = props.info.orderedTime
      .toDate()
      .toString()
      .split(" ")
    
    const orderedDate = orderedAt.slice(0, 4).join(' ');
    const orderedTime = orderedAt.slice(4, 5).toString().split(':')
    let orderedHour = Number(orderedTime[0]);
    let amOrPm = 'am'
    if (orderedHour > 12) {
      orderedHour = orderedHour - 12
      amOrPm = 'pm'
    }
    const orderedMinute = Number(orderedTime[1])
    const modifiedOrderedTime = orderedDate + ' ' + orderedHour + ':' + orderedMinute + ' ' + amOrPm
    return modifiedOrderedTime;
    
    }
 
  return (
      <div className="card card-text p-3 px-2 shadow-lg mb-1">
        <div className="card-text py-2">
          <span className="d-inline-block mb-2">Ingredients:</span> {ingredients}
        </div>
        <div className="card-text"> 
          <p>Price: <strong>USD {Number(props.info.price.toFixed(2))}</strong></p>
          <p>Ordered at <span className='text-uppercase font-weight-bold'>{getOrderedTime()}</span></p>
          {/* <button className="btn btn-secondary" onClick={props.clicked}>Cancel</button> */}
        </div>
      </div>
    );
}

export default Order;