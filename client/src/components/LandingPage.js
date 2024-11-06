import React, { useEffect } from "react";
import ProductList from "./ProductList";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const userQuery = gql`
    query User {
      user @client {
        firstname
      }
    }
  `;
  const res = useQuery(userQuery);
  console.log(res.data);

  if (!res?.data) {
    navigate("/login");
  }

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

  return (
    <div>
      <h2>All Products</h2>
      <ProductList productList={data.products} />
    </div>
  );
};

export default LandingPage;
