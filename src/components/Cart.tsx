import type { CartItem } from '../types/types';
import styles from '../css/Cart.module.css';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export default function Cart({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalItems,
  getTotalPrice,
}: CartProps) {
  // WhatsApp checkout

  const checkoutWithWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Create the message with each item on a new line
    const messageItems = cartItems
      .map((item) => `${item.name} x${item.quantity}`)
      .join('\n');

    const total = getTotalPrice().toFixed(2);

    // Include customer info in the message
    const message = `Hello, I would like to place an order:\n${messageItems}\nTotal: $${total}\n\nPlease provide your name, phone number, and delivery address.`;

    const encodedMessage = encodeURIComponent(message);
    // detect if the user is on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // WhatsApp URL for mobile or desktop
    const whatsappUrl = isMobile
      ? `https://wa.me/233554694601?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=233554694601&text=${encodedMessage}`;
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  if (cartItems.length === 0) return <p>Your cart is empty</p>;

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p className={styles.quantityButtons}>
              Quantity:
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              {item.quantity}
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total Items: {getTotalItems()}</h3>
      <h3>Total Price: ${getTotalPrice().toFixed(2)}</h3>
      <div className={styles.actions}>
        <button className={styles.clearButton} onClick={clearCart}>
          Clear Cart
        </button>
        <button
          className={styles.checkoutButton}
          onClick={checkoutWithWhatsApp}
        >
          Checkout with WhatsApp
        </button>
      </div>
    </div>
  );
}
