// UseCart will manage :
// - cartItems (array of snacks in the cart)
// functions
// - addToCart(flavor: string, quantity: number)
// - removeFromCart(flavor: string)
// - updateQuantity(flavor: string, quantity: number)
// - clearCart()
// - getTotalItems() : number
// - getTotalPrice() : number
import { useState, useEffect } from 'react';
import type { CartItem } from '../types/types';

export default function useCart() {
  // cart items state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // load cart items from local storage on component mount
  useEffect(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error('Error loading cart items from local storage:', error);
      setCartItems([]);
    }
  }, []);
  // save cart items to local storage whenever cartItems state changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // add to cart function
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItems) => cartItems.id === item.id
      );
      if (existingItem) {
        // If item exists, update quantity
        return prevItems.map((cartItems) =>
          cartItems.id === item.id
            ? { ...cartItems, quantity: cartItems.quantity + item.quantity }
            : cartItems
        );
      } else {
        // If item doesn't exist, add to cart
        return [...prevItems, item];
      }
    });
  };
  // remove from cart function
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItems) => cartItems.id !== id)
    );
  };
  // update quantity function
  const updateQuantity = (flavorId: string, quantity: number) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((cartItems) =>
            cartItems.id === flavorId ? { ...cartItems, quantity } : cartItems
          )
          .filter((cartItems) => cartItems.quantity > 0) // Remove items with quantity 0
    );
  };
  // clear cart function
  const clearCart = () => {
    setCartItems([]);
  };
  // get total items function
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  // get total price function
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };
}
