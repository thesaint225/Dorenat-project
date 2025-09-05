import type { CartItem } from '../types/types';

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
  if (cartItems.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>
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
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total Items: {getTotalItems()}</h3>
      <h3>Total Price: ${getTotalPrice().toFixed(2)}</h3>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
