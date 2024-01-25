import React from "react";
import "./card.css";

function Card(props){
   // const formattedPrice = props.price.toLocaleString();
   const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = formatter.format(props.price);

  return(
    <>
            <section className="card">
                
                <img src={props.img} alt="car" />
                <div className="card-details">
                    <h5 className="card-title">{props.name}</h5>
                </div>
                <section className="card-info">
                    <div className="box price">{formattedPrice} |</div>
                    <div className="box">{props.color} |</div>
                    <div className="box"> {props.mileage} mpg</div>
                </section>
            </section>
    </>
);
}

export default Card;