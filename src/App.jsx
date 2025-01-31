import { useState } from 'react';
import './App.css';
import img1 from './image/nike 1.png'
import img2 from './image/nike 2.png'
import img3 from './image/nike 3.png'
import img4 from './image/nike 4.png'
import img5 from './image/nike 5.webp'
import img6 from './image/nike 6.webp'

const products = [
  { id: 1, name: "NIKE 2024", price: 200, image: img1 },
  { id: 2, name: "NIKE", price: 300, image: img2 },
  { id: 3, name: "NIKE 2024", price: 150, image: img3 },
  { id: 4, name: "NIKE 2024", price: 350, image: img4 },
  { id: 5, name: "NIKE", price: 400, image: img5 },
  { id: 6, name: "NIKE", price: 250, image: img6 },
  { id: 7, name: "NIKE AKILL", price: 190, image: img3 },
  { id: 8, name: "NIKE ZOOM", price: 420, image: img5 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };




  // Calculate Total Price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate Total Quantity (for cart icon)
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };












  
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#">HOME</a>
          <a href="#">PRODUCTS</a>
          <a href="#">ORDER PRODUCTS</a>
          <a href="#">CONTACT ME!</a>
        </div>
        <div className="btns">
          <button className="login-btn">Login</button>

          <div className="cart-icon" data-count={calculateTotalQuantity()} onClick={() => setCartOpen(!cartOpen)}>
            🛒
          </div>
        </div>
      </nav>

      <h1>NIKE STORE</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>ADD TO CART 🛒</button>
          </div>
        ))}
      </div>














      {cartOpen && (
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-quantity">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))
          )}
          

          
          <h3 className="cart-total">Total: <span>{calculateTotalPrice()}$</span></h3>
          <div className="btn-opencard">
            <button onClick={() => setCartOpen(!cartOpen)}>Close</button>
            <button>PayMent</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
