import useProducts from '../hooks/useProducts';
import Spinner from './Spinner';
import type { CartItem } from '../types/types';

interface FlavorListProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export default function FlavorList({ addToCart }: FlavorListProps) {
  const { data: products, loading } = useProducts();

  if (loading) return <Spinner />;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
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
