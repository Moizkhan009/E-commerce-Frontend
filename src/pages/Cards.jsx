// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProduct } from "../redux/products/products_action";

// const ProductCard = () => {
//   const dispatch = useDispatch();
//   const { product, status, error } = useSelector(
//     (state) => state.product
//   );

//   console.log(product.products);
  

//   useEffect(() => {
//     dispatch(fetchProduct());
//   }, []);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>{error}</p>;

//   return (
//     <div>
//       <h1>products</h1>
//       <h3>{product.image} {product.name}</h3>
//       <p>{product.brand}</p>
//       <p>${product.price}</p>
//       <span className={product.badgeColor}>{product.badge}</span>
//     </div>
//   );
// };

// export default ProductCard;
 

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
      <h1>Products</h1>

      {product.products?.map((item) => (
        <div key={item._id} className="border p-3 mb-3">
          <h3>
            {item.image} {item.name}
          </h3>

          <p>{item.brand}</p>

          <p>${item.price}</p>

          <span className={item.badgeColor}>
            {item.badge}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
