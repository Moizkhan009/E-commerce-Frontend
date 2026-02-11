import { Plus, Package } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductsList({
  products,
  status,
  error,
  onAddClick,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Products</h2>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {status === "loading" && <p>Loading products...</p>}

      {status === "failed" && (
        <div className="bg-red-100 p-3 rounded">Error: {error}</div>
      )}

      {status === "succeeded" && products.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Package className="w-16 h-16 mx-auto mb-4" />
          <p>No products found</p>
        </div>
      )}

      {status === "succeeded" && products.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
