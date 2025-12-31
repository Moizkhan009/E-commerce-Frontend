import React, { useState } from 'react';

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-50 rounded-3xl overflow-hidden shadow-lg">
       

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-12 md:p-16">
          {/* Left Content */}
          <div className="z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Stay home & get your daily needs from our shop
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg">
              Start Your Daily Shopping with <span className="text-emerald-600 font-semibold">Nest Mart</span>
            </p>

            {/* Email Subscription */}
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Your email address"
                className="flex-1 px-6 py-3.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md text-gray-700"
              />
              <button
                onClick={handleSubscribe}
                className="px-8 py-3.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors font-semibold shadow-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative z-10 flex justify-center md:justify-end">
            <div className="relative">
              {/* Delivery Person */}
              <div className="relative">
                <div className="text-9xl">👨‍🍳</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NewsletterBanner;