import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getApi } from './apiEndpoint';

const ReactQuery = () => {
  // Destructure data, isLoading, and status from useQuery
  const { data, isLoading, status } = useQuery({
    queryKey: ["products"],
    queryFn: getApi,
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          <h1>Products</h1>
          <ul>
            {data.map(product => (
              <li key={product.id}>
                
               {product.title} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReactQuery;
