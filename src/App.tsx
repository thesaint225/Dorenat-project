import './App.css';
import FlavorList from './components/FlavorList';
import Cart from './components/Cart';
import { useState, useEffect } from 'react';
import type { CartItem } from './types/types';
import { BrowserRouter as Routes, Route } from 'react-router-dom';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  // sync to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart helper functions
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.id === item.id
            ? { ...ci, quantity: ci.quantity + item.quantity }
            : ci
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => (ci.id === id ? { ...ci, quantity } : ci))
        .filter((ci) => ci.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <>
      {/* Store title visible on every page */}
      <h1>Snack Store 🍿</h1>

      <Routes>
        {/* Products page */}
        <Route
          path='/'
          element={
            <FlavorList
              cartItems={cartItems}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        {/* Cart page */}
        <Route
          path='/cart'
          element={
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              getTotalItems={getTotalItems}
              getTotalPrice={getTotalPrice}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
