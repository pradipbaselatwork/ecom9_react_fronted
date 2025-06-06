// src/components/Cart.jsx
import React, { useState } from 'react';

const Cart = () => {
  // Initial static cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic Tee',
      price: 19.99,
      quantity: 2,
      img: 'https://via.placeholder.com/100x100?text=Classic+Tee',
    },
    {
      id: 2,
      name: 'V-Neck Tee',
      price: 21.99,
      quantity: 1,
      img: 'https://via.placeholder.com/100x100?text=V-Neck+Tee',
    },
  ]);

  // Helper to calculate total number of items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Helper to calculate cart total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Increase quantity for a given item
  const handleIncrease = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity for a given item (min 1)
  const handleDecrease = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove an item from the cart
  const handleRemove = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">
        Cart <strong>({totalItems})</strong>
      </h5>

      <div className="row">
        {cartItems.map((item) => (
          <div key={item.id} className="col-12 mb-3">
            <div className="card">
              <div className="row g-0">
                {/* <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <img
                    src={item.img}
                    className="img-fluid"
                    alt={item.name}
                    style={{ maxHeight: '100px' }}
                  />
                </div> */}
                <div className="col-md-10">
                  <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() => handleDecrease(item.id)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="btn btn-secondary btn-sm ms-2"
                          onClick={() => handleIncrease(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <p className="card-text fw-bold">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {cartItems.length === 0 && (
          <div className="col-12 text-center">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-4 text-end">
          <h4>
            Total: <span className="fw-bold">${cartTotal.toFixed(2)}</span>
          </h4>
          <button className="btn btn-primary mt-2">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
