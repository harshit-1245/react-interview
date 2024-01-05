import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); //by default

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

  // Define variables for pagination
  const productPerPage = 10;
  const totalPages = Math.ceil(products.length / productPerPage);

  // Logic to handle visible products on the current page
  const startIndex = (page - 1) * productPerPage;
  const endIndex = startIndex + productPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {visibleProducts.map((item, index) => (
            <span className="products__single" key={index}>
              <img src={item.thumbnail} alt={item.title} />
              <span>{item.title}</span>
            </span>
          ))}
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page === 1 ? "products__disabled" : ""}
            onClick={() => setPage(page - 1)}
          >
            <GrLinkPrevious />
          </span>

          {[...Array(totalPages)].map((_, i) => (
            <span
              className={page === i + 1 ? "page__selected" : ""}
              onClick={() => setPage(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}

          <span
            className={page === totalPages ? "products__disabled" : ""}
            onClick={() => setPage(page + 1)}
          >
            <GrLinkNext />
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
