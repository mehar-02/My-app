import React, { useState } from "react";
import Price from "./price.jsx";
import Color from "./color.jsx";
import Mileage from "./mileage.jsx";

import "./sidebar.css";

function Sidebar({onColorSelect, onMinPriceSelect, onMaxPriceSelect, onMinMileSelect, onMaxMileSelect, color,minPrice,maxPrice,minMile,maxMile}){
    // const [color, setColor] = useState('');
    // const [minPrice, setMinPrice] = useState('');
    // const [maxPrice, setMaxPrice] = useState('');
    // const [minMile, setMinMile] = useState('');
    // const [maxMile, setMaxMile] = useState('');
    
    const handleColor= (newcolor) => {
        // setColor(newcolor);
        onColorSelect(newcolor);
    }
    const handleMinPrice = (newMin) => {
        // setMinPrice(newMin);
        onMinPriceSelect(newMin);
    }
    const handleMaxPrice = (newMax) => {
        // setMaxPrice(newMax);
        onMaxPriceSelect(newMax);
    }
    const handleMinMile = (newMin) => {
        // setMinMile(newMin);
        onMinMileSelect(newMin);
    }
    const handleMaxMile = (newMax) => {
        // setMaxMile(newMax);
        onMaxMileSelect(newMax);
    }
    // const resetFilters = () => {
    //     setColor('');
    //     setMinPrice('');
    //     setMaxPrice('');
    //     setMinMile('');
    //     setMaxMile('');
    // };
    return (
        <section className="sidebar">
        <div class="filter">
           <h2 className="sidebar-title price-title">Price</h2>
           <Price min="20000" max="60000" onMinPriceChange={handleMinPrice} onMaxPriceChange={handleMaxPrice} />
           {/* <Price name="Rs. 50,000 - Rs.1,00,000" min="50000" max="100000" onMinPriceChange={handleMinPrice} onMaxPriceChange={handleMaxPrice} />
           <Price name="Rs. 1,00,000 - Rs. 6,00,000" min="100000" max="600000" onMinPriceChange={handleMinPrice} onMaxPriceChange={handleMaxPrice} />
           <Price name="Over Rs. 6,00,000" min="600000" max="99999999" onMinPriceChange={handleMinPrice} onMaxPriceChange={handleMaxPrice} /> */}
           <h2 className="sidebar-title color-title">Color</h2>
           <Color name="Red" onColorChange={handleColor} />
           <Color name="Blue" onColorChange={handleColor} />
           <Color name="Black" onColorChange={handleColor} />
           <Color name="White" onColorChange={handleColor} />
           <Color name="Silver" onColorChange={handleColor} />
           <h2 className="sidebar-title mileage-title">Mileage</h2>
           <Mileage min="30" max="140" onMinMileChange={handleMinMile} onMaxMileChange={handleMaxMile} />
           {/* <Mileage name="Over 20,000 miles" min="20000" max="999999" onMinMileChange={handleMinMile} onMaxMileChange={handleMaxMile} /> */}
           </div>
           {/* <button class="btns clear" onClick={resetFilters}>Clear Filters</button> */}
        </section>
    );
}

export default Sidebar;