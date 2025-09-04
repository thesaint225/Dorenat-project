🍿 Snack Shop MVP

A single-page React app where customers can browse snack flavors, add them to a cart, and checkout via WhatsApp.
This project is both a learning exercise (to practice React fundamentals) and a portfolio showcase (to demonstrate clean, modern React code).

✨ Features

Product Display:

Shows snack flavors with names, prices, and images.

Cart System:

Add flavors to cart, update quantities, remove items.

Real-time total calculation.

Checkout via WhatsApp:

Pre-fills an order message with selected items + total.

Opens WhatsApp to confirm the order.

🛠 Tech Stack

React (functional components + hooks)

Custom Hook (useCart) for cart state (single source of truth, no Context).

TypeScript (for type safety, optional but recommended).

CSS / Tailwind for responsive styling.

Vercel / Netlify for deployment.

📂 Project Structure
src/
components/
Header.tsx
FlavorList.tsx
Cart.tsx
CheckoutButton.tsx
hooks/
useCart.ts
utils/
formatPrice.ts
calculateCartTotal.ts
generateWhatsAppLink.ts
capitalize.ts
App.tsx

🚀 Getting Started

1. Clone the repo

git clone https://github.com/thesaint225/Dorenat-project.git

2. Install dependencies
   npm install

# or

yarn install

3. Run the app
   npm run dev

# or

yarn dev
