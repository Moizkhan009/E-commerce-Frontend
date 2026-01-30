import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/products/products_action";

const ProductCard = () => {
  const dispatch = useDispatch();
  const { product, status, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div>
      <h3>{product.image} {product.name}</h3>
      <p>{product.brand}</p>
      <p>${product.price}</p>
      <span className={product.badgeColor}>{product.badge}</span>
    </div>
  );
};

export default ProductCard;
