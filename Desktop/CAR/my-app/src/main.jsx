import React,{useState,useEffect} from "react";
//import Card from "./card.jsx";
import Navbar from "./navbar.jsx";
// import Crousel from "./crousel.jsx";
import axios from 'axios';
import Product from "./product.jsx";
import Sidebar from "./sidebar.jsx";
import "./main.css";
function Main(){
    const [cars, setCars] = useState([]);
    const [color, setColor] = useState("All");

    const [minPrice, setMinPrice] = useState(20000);
    const [maxPrice, setMaxPrice] = useState(60000);

    const [minPriceChange, setMinPriceChange] = useState(20000);
    const [maxPriceChange, setMaxPriceChange] = useState(60000);

    const [searchQuery, setSearchQuery] = useState(null);
    
    const [minMile, setMinMile] = useState(30);
    const [maxMile, setMaxMile] = useState(140);

    const [minMileChange, setMinMileChange] = useState(30);
    const [maxMileChange, setMaxMileChange] = useState(140);

    const [filterApplied, setFilterApplied] = useState(false);
    const [load, setLoad] = useState(false);

    // const [checked, setChecked] = useState(false);

    const handleColorSelect = (newcolor) => {
      setFilterApplied(true);
      // setChecked(true);
        setColor(newcolor);
    };

    const handlePriceSelect = (newMinPrice, newMaxPrice) => {
      setFilterApplied(true);
      setMinPriceChange(newMinPrice);
      setMaxPriceChange(newMaxPrice);
    }

    const handleMileSelect = (newMinMile, newMaxMile) => {
      console.log("Handle mil change")
      setFilterApplied(true);
      //console.log("main min price", newMinMile)
      setMinMileChange(newMinMile);
      setMaxMileChange(newMaxMile);
    }
  
    const handleSearch = (newCars) => {
        console.log("handle search",newCars)
        setCars(newCars);
        setFilterApplied(true);
    };
    
    const handleClearFilters = () => {
      setMinMileChange(minMile);
      setMaxMileChange(maxMile);
      // setSearchQuery("");
      setColor("All");
      setMinPriceChange(20000);
      setMaxPriceChange(60000);
    
      setFilterApplied(false);
    };

  useEffect(() => {
    async function fetchCarsData(){
        try{
            let queryObject = {}
            if(color){
                queryObject.color=color;
            }
            if(minMileChange){
              queryObject.minMile=minMileChange;
            }
            if(maxMileChange){
              queryObject.maxMile=maxMileChange;
            }
            if(minPriceChange){
              queryObject.minPrice=minPriceChange;
            }
            if(maxPriceChange){
              queryObject.maxPrice=maxPriceChange;
            }
            
             //const response = await axios.get('http://localhost:5000/api/data',{
             const response = await axios.get('https://cars-backend-six.vercel.app/api/data',{
                params:queryObject
            });
            setCars(response.data);
           }
           catch(error){
            console.error("Error: ",error);
           }
        }
        fetchCarsData();
},[color,minPriceChange,maxPriceChange,minMileChange,maxMileChange]);


  const fetchSearch = async (searchQuery) => {
    try{
      console.log("Search Query:", searchQuery);

        if(searchQuery!==null && searchQuery!==''){
            let queryObject = {
              searchQuery: searchQuery
            }
            //const response = await axios.get('http://localhost:5000/api/search',{
            const response = await axios.get('https://cars-backend-six.vercel.app/api/search',{
            params:{
                search:searchQuery
            }
            });
            console.log(response.data);
            setCars(response.data);
        } else{
          console.warn("Search query is null or empty.");
        }
      }
    catch(error){
        console.error("Error: ",error);
    }
}

console.log("Cars ", cars)
    return (
        <div className={filterApplied ? "main-container with-filter" : "main-container"}>
           
            <Navbar onSearch = {fetchSearch} filter={filterApplied} />
            <Sidebar 
              onColorSelect={handleColorSelect} 
              onPriceSelect={handlePriceSelect} 
              // onMaxPriceSelect={handleMaxPriceSelect} 
              onMileSelect={handleMileSelect} 
              // onMaxMileSelect={handleMaxMileSelect} 
              onClear={handleClearFilters}
              color={color}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minMile={minMile}
              maxMile={maxMile}
              minPriceChange={minPriceChange}
              maxPriceChange={maxPriceChange}
              minMileChange={minMileChange}
              maxMileChange={maxMileChange}
              />
            
            <Product cars={cars} />
        </div>
    );
}

export default Main;
