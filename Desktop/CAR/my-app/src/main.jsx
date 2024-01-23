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

    const [searchQuery, setSearchQuery] = useState(null);
    
    const [minMile, setMinMile] = useState(30);
    const [maxMile, setMaxMile] = useState(140);

    const [filterApplied, setFilterApplied] = useState(false);
    const handleColorSelect = (newcolor) => {
      setFilterApplied(true);
        setColor(newcolor);
    };
    const handleMinPriceSelect = (newMinPrice) => {
      setFilterApplied(true);
      setMinPrice(newMinPrice);
    }
    const handleMaxPriceSelect = (newMaxPrice) => {
      setFilterApplied(true);
      setMaxPrice(newMaxPrice);
    }
    const handleMinMileSelect = (newMinMile) => {
      setFilterApplied(true);
      setMinMile(newMinMile);
    }
    const handleMaxMileSelect = (newMaxMile) => {
      setFilterApplied(true);
      setMaxMile(newMaxMile);
    }
    const handleSearch = (newCars) => {
        console.log("handle search",newCars)
        setCars(newCars);
        setFilterApplied(true);
    };
  useEffect(() => {
    async function fetchCarsData(){
        try{
            let queryObject = {}
            if(color){
                queryObject.color=color;
            }
            if(minPrice){
              queryObject.minPrice=minPrice;
            }
            if(maxPrice){
              queryObject.maxPrice=maxPrice;
            }
            if(minMile){
              queryObject.minMile=minMile;
            }
            if(maxMile){
              queryObject.maxMile=maxMile;
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
},[color,minPrice,maxPrice,minMile,maxMile]);


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
           
            <Navbar onSearch = {fetchSearch} />
            <Sidebar 
              onColorSelect={handleColorSelect} 
              onMinPriceSelect={handleMinPriceSelect} 
              onMaxPriceSelect={handleMaxPriceSelect} 
              onMinMileSelect={handleMinMileSelect} 
              onMaxMileSelect={handleMaxMileSelect} 
              color={color}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minMile={minMile}
              maxMile={maxMile}
              />
            <Product cars={cars} />
        </div>
    );
}

export default Main;