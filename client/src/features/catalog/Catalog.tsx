import { useEffect, useState } from "react";
import { Product } from "../../app/modules/Product";
import ProductList from "./ProductList";
import agent from "./../../app/api/agent";
import Loading from "./../../app/layout/Loading";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
