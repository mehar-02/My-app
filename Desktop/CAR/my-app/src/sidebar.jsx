import React from "react";
import Price from "./price.jsx";
import Color from "./color.jsx";
import Mileage from "./mileage.jsx";

import "./sidebar.css";

function Sidebar({onColorSelect, onPriceSelect, onMileSelect, onClear,color,minPrice,maxPrice,minMile,maxMile, minPriceChange, maxPriceChange, minMileChange, maxMileChange}){
    
    const handleColor= (newcolor) => {
        onColorSelect(newcolor);
    }
    const handlePrice = (newMin,newMax) => {
        onPriceSelect(newMin,newMax);
    }
    const handleMile = (newMin, newMax) => {
        onMileSelect(newMin,newMax);
    }
    // const handleClear = (newcolor) => {
    //     onClear();
    // }
    return (
        <section className="sidebar">
        <div className="filter">
            <button className="clear-filters-btn btns" onClick={onClear} >
               Clear Filters
            </button>
           <h2 className="sidebar-title price-title">Price</h2>
           <Price min={minPrice} max={maxPrice} minChange={minPriceChange} maxChange={maxPriceChange} onPriceChange={handlePrice} />
           
           <h2 className="sidebar-title color-title">Color</h2>
           <div className="colors">
           <div className="div1" style={{width: "35%"}}>
           <Color name="All" onColorChange={handleColor} />
           <Color name="Red" onColorChange={handleColor} />
           <Color name="Blue" onColorChange={handleColor} />
           </div>
           <div className="div2" style={{width: "35%"}}>
           <Color name="Black" onColorChange={handleColor} />
           <Color name="White" onColorChange={handleColor} />
           <Color name="Silver" onColorChange={handleColor} />
           </div>
           </div>

           <h2 className="sidebar-title mileage-title">Mileage</h2>
           <Mileage min={minMile} max={maxMile} minChange={minMileChange} maxChange={maxMileChange} onMileChange={handleMile} />

            

        </div>
        </section>
    );
}

export default Sidebar;