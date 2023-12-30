import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

function App() {
  const [products, setProducts] = useState([]);
  const [page,setPage]=useState(1) //by default

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getApi = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products", {
          cancelToken: source.token,
        });
        setProducts(response.data.products); // Assuming the API response is an array of products directly
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.log("Error:", error.message);
        }
      }
    };

    getApi();

    return () => {
      // Cancel the request when the component unmounts or before re-running the effect
      source.cancel("Cleanup: Component unmounted");
    };
  }, []);

const selectPageHandler=(selectedPage)=>{
  if(selectedPage >=1 && selectedPage<=products.length/3 && selectedPage!==page){
    setPage(selectedPage)
  }
 
}

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page,page*10).map((item) => (
            <span className="products__single" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
            </span>
      ))}
        </div>
  )}
  {/* now pagination start */}
  {products.length > 0 && <div className="pagination">
   <span className={page > products.length/10 ? "products__disabled":""} onClick={()=>setPage(page-1)}><GrLinkPrevious/></span>
   {[...Array(products.length/3)].map((_,i)=>{
    return <span 
    className={page === i+1 ? "page__selected": ""}
    onClick={()=>selectPageHandler(i+1)} key={i}>{i+1}</span>
   })}
   
   <span className={page < products.length/10 ? "products__disabled":""} onClick={()=>setPage(page+1)}><GrLinkNext/></span>
    </div>
}
    </div>
  );
}

export default App;
