import Stars from "./Stars";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {product.badge && (
        <span
          className={`inline-block ${product.badgeColor} text-white px-2 py-1 rounded`}
        >
          {product.badge}
        </span>
      )}

      <div className="h-40 flex items-center justify-center text-7xl">
        <img src={product.image} alt={product.name} />
      </div>

      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm">By {product.brand}</p>

      <div className="flex items-center">
        <Stars rating={product.rating} />
      </div>

      <div className="flex gap-2">
        <span className="text-green-600 font-bold">${product.price}</span>
        {product.originalPrice > product.price && (
          <span className="line-through text-gray-400">
            ${product.originalPrice}
          </span>
        )}
      </div>
    </div>
  );
}
