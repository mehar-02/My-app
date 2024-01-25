import React from "react";
import "./product.css";
import Card from "./card.jsx";
function Product({cars, filter}){
    return(
        <>
        <section className={filter ? "card-container with-filter" : "card-container"} >
            {cars.map((car) => 
            <Card key={car.car_id} id={car.car_id} name={car.model_name} price={car.list_price} color={car.color} mileage={car.mileage} img={car.img} />
            )} 
        </section>
        </>
    );
}

export default Product;