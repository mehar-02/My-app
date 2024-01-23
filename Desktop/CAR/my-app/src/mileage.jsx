import React, { useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "./mileage.css";
function Mileage({onMinMileChange, onMaxMileChange,min,max}){
   
   const [minValue, setMinValue] = useState(min);
   const [maxValue, setMaxValue] = useState(max);
   const [slidertimeout, setslidertimeout] = useState(null);
  
   const handleSliderChange=(minMile,maxMile)=>{
      console.log("Slider Change:", minMile, maxMile);
      if(slidertimeout){
         clearTimeout(slidertimeout);
      }
      const newTimeout=setTimeout(()=>{
         onMinMileChange(minValue);
         onMaxMileChange(maxValue);
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
          <div>
            <span>min: {minValue} miles, </span>
            <span className="max-value"> max: {maxValue} miles </span>
          </div>
        </div>
        </label>
    </div>
   </div>
}

export default Mileage;