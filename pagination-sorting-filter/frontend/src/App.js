import React, { useEffect, useState } from "react"
import axios from "axios"
import './App.css';
import Search from "./component/Search/Index";
import Table from "./component/Table/Index";





function App() {
const [obj,setObj]=useState({})
const [sort,setSort]=useState({sort : "rating",order:"desc"})
const [filterGenre,setFilterGenre]=useState([])
const [page,setPage]=useState(1);
  const [search,setSearch]=useState("")
  
useEffect(()=>{

   const getAllMovies=async()=>{
    try{
      const url = `http://localhost:5000/movies?page=${page}&sort=${sort.sort},${sort.order}&genre=${filterGenre.toString()}&search=${search}`
      const {data} = await axios.get(url)
      setObj(data)
      console.log(data)
   }
 catch (error) {
  console.log(error);
}
}
getAllMovies();


},[sort,filterGenre,page,search])

  return (
    <div className="wrapper">
      <div className="container">
        <div className="head">
          <img src="" alt="" />
          <Search  setSearch={(search)=>setSearch(search)} />
        </div>
        <div className="body">
          <div className="table_container">
            <Table movies={obj.movies ? obj.movies:[]} />
          </div>
          <div className="filter_container"></div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
