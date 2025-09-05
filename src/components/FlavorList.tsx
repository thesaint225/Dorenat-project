import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';
import Spinner from './Spinner';

export default function FlavorList() {
  // destructure the hook return value
  const { addToCart } = useCart();

  // destructure + rename: "data" → "products"
  const { data: products, loading } = useProducts();

  // show spinner while loading
  if (loading) {
    return (
      <h2>
        <Spinner />
      </h2>
    );
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100px', height: '100px' }}
          />
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
