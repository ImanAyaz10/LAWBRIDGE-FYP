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

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl overflow-hidden">

            {/* Contact Info */}
            <div className="bg-green-900 text-white p-8 flex flex-col justify-center items-center contact-info mx-10 px-[30px] rounded-lg">
              <h2 className="text-3xl font-bold mb-6">
                Get in Touch
              </h2>

              <div className="space-y-4">
                <p className="text-lg">
                  <strong>📞 Phone:</strong> +92 300 1234567
                </p>

                <p className="text-lg">
                  <strong>📧 Email:</strong> support@lawbridge.com
                </p>

                <p className="text-lg">
                  <strong>📍 Address:</strong> Lahore, Pakistan
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <form className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-900 hover:bg-green-00 text-white py-3 rounded-lg font-semibold transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;