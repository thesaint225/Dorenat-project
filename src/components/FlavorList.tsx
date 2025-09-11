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

export default function FlavorList({
  addToCart,
  cartItems,
  updateQuantity,
  removeFromCart,
}: FlavorListProps) {
  const { data: products = [], loading } = useProducts();

  const getQuantity = (id: string): number => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

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

          {/* Conditional Rendering */}
          <div className={styles.actionArea}>
            {getQuantity(product.id) === 0 ? (
              // Show Add to Cart button first
              <button
                className={styles.addButton}
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
            ) : (
              // Show quantity controls when already added
              <div className={styles.quantityControls}>
                <button
                  type='button'
                  onClick={() => {
                    const newQty = getQuantity(product.id) - 1;
                    if (newQty <= 0) {
                      removeFromCart(product.id);
                    } else {
                      updateQuantity(product.id, newQty);
                    }
                  }}
                >
                  -
                </button>

                <span className={styles.qtyNumber}>
                  {getQuantity(product.id)}
                </span>

                <button
                  type='button'
                  onClick={() =>
                    updateQuantity(product.id, getQuantity(product.id) + 1)
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
