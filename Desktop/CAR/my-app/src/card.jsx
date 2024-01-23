import React from "react";
import "./card.css";

function Card(props){
  return(
    <>
            <section className="card">
                
                <img src={props.img} />
                <div className="card-details">
                    <h5 className="card-title">{props.name}</h5>
                </div>
                <section className="card-info">
                    <div className="box price">${props.price} |</div>
                    <div className="box">{props.color} |</div>
                    <div className="box"> {props.mileage} miles</div>
                </section>
            </section>
</>
);
}

export default Card;