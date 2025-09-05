// import { useState, useEffect } from 'react';
// import type { CartItem } from '../types/types';

// export default function useCart() {
//   const [cartItems, setCartItems] = useState<CartItem[]>(() => {
//     // Load from localStorage on initial render
//     const stored = localStorage.getItem('cartItems');
//     return stored ? JSON.parse(stored) : [];
//   });

//   // Sync cartItems to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Add to cart
//   const addToCart = (item: CartItem): void => {
//     setCartItems((prev) => {
//       const existing = prev.find((ci) => ci.id === item.id);
//       if (existing) {
//         return prev.map((ci) =>
//           ci.id === item.id
//             ? { ...ci, quantity: ci.quantity + item.quantity }
//             : ci
//         );
//       }
//       return [...prev, item];
//     });
//   };

//   // Remove from cart
//   const removeFromCart = (id: string): void =>
//     setCartItems((prev) => prev.filter((ci) => ci.id !== id));

//   // Update quantity
//   const updateQuantity = (id: string, quantity: number): void =>
//     setCartItems((prev) =>
//       prev
//         .map((ci) => (ci.id === id ? { ...ci, quantity } : ci))
//         .filter((ci) => ci.quantity > 0)
//     );

//   // Clear cart
//   const clearCart = (): void => setCartItems([]);

//   // Get total items
//   const getTotalItems = (): number =>
//     cartItems.reduce((total, item) => total + item.quantity, 0);

//   // Get total price
//   const getTotalPrice = (): number =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   return {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getTotalItems,
//     getTotalPrice,
//   };
// }
