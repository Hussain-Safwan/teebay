import React from "react";
import ProductList from "./ProductList";
import { gql, useQuery } from "@apollo/client";

const LandingPage = () => {
  const productsQuery = gql`
    query Products {
      products {
        product_id
        title
        description
        categories
        selling_price
        renting_price
        renting_price_unit
        user_id
        bought_by
        rented_by
        creating_date
        buying_date
        renting_date
      }
    }
  `;
  const { error, loading, data } = useQuery(productsQuery);
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;

  console.log(data);
  return (
    <div>
      <h2>All Products</h2>
      <ProductList productList={data.products} />
    </div>
  );
};

export default LandingPage;
