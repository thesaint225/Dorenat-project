import useProducts from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import type { CartItem } from '../types/types';
import styles from '../css/FlavourList.module.css';

interface FlavorListProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export default function FlavorList({ addToCart }: FlavorListProps) {
  const { data: products, loading } = useProducts();
  const navigate = useNavigate();

  if (loading) return <Spinner />;

  return (
    <div className={styles.flavorList}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <h2 className={styles.productName}>{product.name}</h2>
          <img
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
          />
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          <button
            className={styles.addButton}
            onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
              });
              setTimeout(() => {
                navigate('/cart');
              }, 1000);
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
