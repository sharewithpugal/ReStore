import { useEffect } from "react";
import ProductList from "./ProductList";
import Loading from "./../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoadded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoadded) dispatch(fetchProductsAsync());
  }, [productsLoadded, dispatch]);

  if (status.includes("pending")) return <Loading />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
