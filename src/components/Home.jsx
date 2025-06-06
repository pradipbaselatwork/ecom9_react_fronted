// src/components/Home.jsx
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL; 
  const IMAGE_BASE_URL = API_URL.replace('/api', '') + '/storage/product_images';

  // Fetch featured products on mount
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${API_URL}/home`);
        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseErr) {
          throw new Error(`Server returned invalid JSON:\n${text}`);
        }

        if (response.ok && data.status === 'true') {
          setFeaturedProducts(data.featuredProducts);
        } else {
          setError(data.message || 'Failed to load featured products.');
        }
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(
          err.message.startsWith('Server returned invalid JSON:')
            ? 'Server error: could not parse response.'
            : 'Could not connect to server.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [API_URL]);

  // Handler to add a product to cart
  const handleAddToCart = async (productId) => {
    // For this example, we'll use a default size "M" and quantity 1.
    const payload = {
      product_id: productId,
      size: 'M',
      quantity: 1,
    };

    try {
      const response = await fetch(`${API_URL}/add/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.status === 201 && data.status === 'true') {
        alert('Product added to cart successfully!');
      } else {
        alert(data.message || 'Failed to add product to cart.');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Could not connect to server.');
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Featured Products</h4>

      {loading && (
        <div className="col-12 text-center">
          <p>Loading featured products…</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 mb-4">
              <div className="card h-100">
                {/* Uncomment if you want to show the product image */}
                {/* 
                <img
                  src={`${IMAGE_BASE_URL}/${product.product_image}`}
                  className="card-img-top"
                  alt={product.product_name}
                  style={{ objectFit: 'cover', height: '80px' }}
                /> 
                */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text text-muted">
                    Rs: <strong>{product.product_price}</strong>
                  </p>
                  <p className="card-text text-muted">
                    Code: <strong>{product.product_code}</strong> 
                    Color: <strong>{product.product_color}</strong>
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {featuredProducts.length === 0 && (
            <div className="col-12 text-center">
              <p>No featured products available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
