import React,{useState,useEffect} from "react";
import "./product.css";
import Card from "./card.jsx";
import axios from 'axios';
function Product({cars}){
    return(
        <>
        <section className="card-container">
            {cars.map((car) => 
            <Card id={car.car_id} name={car.model_name} price={car.list_price} color={car.color} mileage={car.mileage} img={car.img} />
            )} 
        </section>
        </>
    );
}

export default Product;