import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./mileage.css";
function Mileage({onMileChange,min,max, minChange, maxChange}){

  const handleSliderChange = (minMile, maxMile) => {
    console.log("Mil age change")
    onMileChange(minMile,maxMile);
  }
   return <div className="ml">
         
         <div className="sidebar-items">
        <label className="sidebar-label-container">
            <MultiRangeSlider
          min={min}
          max={max}
          canMinMaxValueSame={true}
          onChange={(e) => {
            // console.log("event", e)
            handleSliderChange(e.minValue,e.maxValue);
          }}

          label={false}
          ruler={false}
          style={{ border: "none", boxShadow: "none", padding: "15px 10px 15px 30px", width:"70%" }}
          barLeftColor="#FFF8E3"
          barInnerColor="#F3D7CA"
          barRightColor="#FFF8E3"
          thumbLeftColor="#E6A4B4"
          thumbRightColor="#E6A4B4"
          minValue={minChange}
          maxValue={maxChange}
        />
        <div className="divOutput">
            <span className="minMile">min: {minChange} mpg, </span>
            <span className="max-value maxMile"> max: {maxChange} mpg </span>
        </div>
        </label>
    </div>
   </div>
}

export default Mileage;