import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./price.css";
function Price({onPriceChange,min,max, minChange, maxChange}){
   const handleSliderChange = (minPrice, maxPrice) => {
      onPriceChange(minPrice,maxPrice);
   }

   return <div className="ml">
      
      <div className="sidebar-items">
        <label className="sidebar-label-container">
            <MultiRangeSlider
          min={min}
          max={max}
          canMinMaxValueSame={true}

          onChange={(e) => {
            // console.log(e);
            handleSliderChange(e.minValue,e.maxValue);
          }}
          label={false}
          ruler={false}
          style={{ border: "none", boxShadow: "none", padding: "15px 10px 15px 30px", width: "70%" }}
          barLeftColor="#FFF8E3"
          barInnerColor="#F3D7CA"
          barRightColor="#FFF8E3"
          thumbLeftColor="#E6A4B4"
          thumbRightColor="#E6A4B4"
          minValue={minChange}
          maxValue={maxChange}
        />
        <div className="divOutput">
            <span className="minPrice">min: ${minChange.toLocaleString()}, </span>
            <span className="maxPrice">max: ${maxChange.toLocaleString()}</span>
        </div>
        </label>
       
      </div>
   </div>
}

export default Price;