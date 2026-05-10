import React from "react";
import PageTransition from "../components/animations/PageTransition";
import PageHeader from "../components/PageHeader";
import "../styles/contact.css";

function Contact() {
  return (
    <PageTransition>
      <PageHeader 
        title="Contact Us" 
        subtitle="Have questions? Need legal help? Send us a message and our team will respond shortly." 
      />

      <div className="contact-container">
        <div className="max-w-7xl mx-auto">
          <div className="contact-box">

            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p><strong>Phone:</strong> +92 300 1234567</p>
              <p><strong>Email:</strong> support@lawbridge.com</p>
              <p><strong>Address:</strong> Lahore, Pakistan</p>
            </div>

            {/* Contact Form */}
            <form className="contact-form">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" />
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
              <label>Message</label>
              <textarea placeholder="Write your message..." />
              <button type="submit">Send Message</button>
            </form>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;