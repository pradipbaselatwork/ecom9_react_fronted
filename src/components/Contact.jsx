// src/components/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="container mt-5">
      <section className="mb-5">
        <h2>Send Us a Message</h2>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              className="form-control"
              placeholder="Brief subject of your message"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className="form-control"
              rows="5"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
