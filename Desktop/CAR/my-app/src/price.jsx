import React, { useState, useEffect } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "./price.css";
function Price({onMinPriceChange, onMaxPriceChange,min,max}){
   
   const [minValue, setMinValue] = useState(min);
   const [maxValue, setMaxValue] = useState(max);
   const [slidertimeout, setslidertimeout] = useState(null);
 
   const handleSliderChange=(minPrice,maxPrice)=>{
      console.log("Slider Change:", minPrice, maxPrice);
      if(slidertimeout){
         clearTimeout(slidertimeout);
      }
      const newTimeout=setTimeout(()=>{
         onMinPriceChange(minValue);
         onMaxPriceChange(maxValue);
      },10);
      setslidertimeout(newTimeout);
   };

   return <div className="ml">
      
      <div className="sidebar-items">
        <label className="sidebar-label-container">
            <MultiRangeSlider
          min={min}
          max={max}
          canMinMaxValueSame={true}

          onChange={(e) => {
            setMinValue(e.minValue);
            setMaxValue(e.maxValue);
            handleSliderChange(minValue,maxValue);
          }}
          label={false}
          ruler={false}
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          barLeftColor="#FFF8E3"
          barInnerColor="#F3D7CA"
          barRightColor="#FFF8E3"
          thumbLeftColor="#E6A4B4"
          thumbRightColor="#E6A4B4"
        />
        <div className="divOutput">
            <span>min: ${minValue}, </span>
            <span>max: ${maxValue}</span>
        </div>
        </label>
       
      </div>
   </div>
}

export default Price;