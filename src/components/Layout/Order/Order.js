import React from 'react'


const Order = (props) => {
    
    const ingredients = []; 
    for (let key in props.info.ingredients) {
        ingredients.push(
            <span className="p-1 bg-secondary  m-1 text-white rounded d-inline-block" key={key}>
                {key}({props.info.ingredients[key]})
            </span>);
    }

    return (
      <div className="card card-text p-3 px-2 shadow-lg mb-1">
        <div className="card-text py-2">
          <span className="d-inline-block mb-2">Ingredients:</span> {ingredients}
        </div>
        <div className="card-text">
          Price: <strong>USD {Number(props.info.price.toFixed(2))}</strong>
        </div>
      </div>
    );
}

export default Order;