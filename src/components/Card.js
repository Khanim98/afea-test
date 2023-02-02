import React from "react";

export function Card({product}) {
    // {console.log(product)}
    return(
    <div className="card" key={product.id}>
        <div className="image-container">
            <img src={product.images[0]}/>
        </div>
        <div className="description">
            <div className="head-line">
                <div>{product.title}</div>
                <div>{product.price} $</div>
            </div>
            <div>{product.rating} stars</div>
        </div>
    </div>
    )
}