// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <h5 className="mb-4">About Our E-Commerce Site</h5>

      <section className="mb-5">
        <h2>Who We Are</h2>
        <p>
          Welcome to eCom9, your number one source for high-quality apparel and accessories. 
          We’re dedicated to giving you the very best online shopping experience, with a focus 
          on product variety, customer service, and fast shipping. Founded in 2023, eCom9 has 
          come a long way from its beginnings as a small startup. When we first started out, 
          our passion for providing trendy, affordable clothing drove us to do intense research 
          so that eCom9 can offer you the world’s most advanced fashion at accessible prices. 
          We now serve customers all over the country, and are thrilled that we’re able to help 
          bring style and comfort to your doorstep.
        </p>
      </section>

      <section className="mb-5">
        <h2>Our Mission</h2>
        <p>
          At eCom9, our mission is to make online shopping simple, secure, and fun. We believe 
          everyone deserves to look and feel their best without breaking the bank. That’s why 
          we source products directly from trusted manufacturers and designers, negotiate 
          fair prices, and pass the savings on to you. We strive to be transparent, ethical, 
          and sustainable in everything we do—whether that’s packaging our orders with eco-friendly 
          materials, or partnering with charitable organizations to give back to the community.
        </p>
      </section>

      <section className="mb-5">
        <h2>What We Offer</h2>
        <ul>
          <li>
            <strong>Wide Selection:</strong> From classic tees and graphic hoodies to 
            seasonal collections and limited-edition drops, we have something for every style.
          </li>
          <li>
            <strong>Quality Assurance:</strong> Every product on eCom9 is carefully inspected 
            for material quality, stitching, and durability. Our team tests samples in real-world 
            conditions before adding them to the store.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
