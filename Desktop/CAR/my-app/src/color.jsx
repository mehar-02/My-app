import React,{useState} from "react";
import "./color.css";
function Color({onColorChange,name}){
    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        setColor(event.target.value);
        onColorChange(name);
    }
    
 return <div className="ml">
    

    <div className="sidebar-items">
        <label className="sidebar-label-container color">
            <input type="radio" id={name} name="test" value={name} onChange={handleColorChange} />
            <span className="checkmark"></span>{name}
        </label>
       
    </div>
 </div>
}

export default Color;