import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { popularProducts } from "../data"; // Importing popularProducts

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState(popularProducts);

  useEffect(() => {
    if (cat) {
      setFilteredProducts(
        popularProducts.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key]?.includes(value)
          )
        )
      );
    } else {
      setFilteredProducts(popularProducts);
    }
  }, [cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
