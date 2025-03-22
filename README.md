# Shopkaro - Amazon Clone

Welcome to **Shopkaro**, a beginner-level Amazon clone built using HTML, CSS, and JavaScript. This project mimics the core functionalities of an e-commerce platform, storing data in the browser's **localStorage** with product details managed in a JSON format. No external database is used, making it a lightweight and simple project perfect for learning front-end development.

This is my first attempt at creating a functional web application, and I’m excited to share it with you!

## Features
- **Product Listing**: Displays a catalog of products fetched from a JSON file.
- **Add to Cart**: Allows users to add products to their shopping cart.
- **Cart Management**: View and manage items in the cart, with data stored in localStorage.
- **Responsive Design**: Basic responsive layout using CSS for a decent experience across devices.
- **Local Storage**: Persists cart data in the browser using localStorage, no database required.

## Technologies Used
- **HTML**: Structure of the web pages.
- **CSS**: Styling and layout design.
- **JavaScript**: Logic for interactivity, cart functionality, and localStorage management.
- **JSON**: Static product data stored in a JSON file.

## Project Structure
```
Shopkaro/
├── amazon.html        # Main homepage
├── checkout.html         # Cart page
|__ orders.html  # Make Order 
|-- tracking.html
├── images/  # Images 
│ 
├── backend/
│   └── backend_product.js
|   |__ products.json
├── data/
│   └── products.js
|   |__ cart.js
|   |__ DeliveryOption.js
├── scripts/
|   |__ utils/
    |   |__ money.js
│   └── amazon.js
|   |__ check.js
|   |__ amazon1.js
|
├── README.md         # Project documentation
└── (other assets like images if applicable)
```

## Setup Instructions
Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shivamxverma/Shopkaro.git
   ```
2. **Navigate to the Project Folder**:
   ```bash
   cd Shopkaro
   ```
3. **Open the Project**:
   - Open `amazon.html` in your preferred web browser (e.g., Chrome, Firefox).
   - No additional server or setup is required since this is a static project.

4. **Explore**:
   - Browse the product listings on the homepage.
   - Add items to the cart and view them on the cart page.

## How It Works
- Product data is stored in `products.json` and loaded dynamically using JavaScript.
- The cart functionality uses the browser’s `localStorage` to save and retrieve cart items.
- No backend or database is involved; all data is handled client-side.

## Limitations
- As a beginner project, it lacks advanced features like user authentication or payment integration.
- Data persistence is limited to the browser’s localStorage and clears if the storage is reset.
- No server-side processing; it’s purely a front-end application.

## Future Improvements
- Add a backend (e.g., Node.js) and database (e.g., MongoDB) for persistent storage.
- Implement user login and registration.
- Enhance the UI/UX with a modern CSS framework like Bootstrap or Tailwind.
- Add a search and filter functionality for products.

## Contributions
This is a personal learning project, but feel free to fork the repository and submit pull requests if you’d like to suggest improvements!

## Contact
For any questions or feedback, reach out to me via GitHub: [shivamxverma](https://github.com/shivamxverma).

---