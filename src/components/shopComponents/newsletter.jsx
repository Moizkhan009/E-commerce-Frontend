import React, { useState } from 'react';

const Newsletter = () => {
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="relative bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5 sm:opacity-10">
          <div className="hidden sm:block absolute top-4 left-4 text-6xl sm:text-7xl lg:text-8xl">🥬</div>
          <div className="hidden md:block absolute top-8 right-8 text-5xl sm:text-6xl">🥕</div>
          <div className="hidden lg:block absolute bottom-4 left-1/4 text-6xl sm:text-7xl">🍅</div>
          <div className="absolute top-1/2 -left-4 text-4xl sm:top-1/2 sm:left-4 sm:text-5xl">🥒</div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
          {/* Left Content - Mobile first */}
          <div className="z-10 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
              Stay home & get your daily needs from our shop
            </h2>
            
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
              Start Your Daily Shopping with <span className="text-emerald-600 font-semibold">Nest Mart</span>
            </p>

            {/* Email Subscription - Responsive */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="📧 Your email address"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm sm:shadow-md text-sm sm:text-base text-gray-700"
              />
              <button
                onClick={handleSubscribe}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors font-semibold shadow-sm sm:shadow-md whitespace-nowrap text-sm sm:text-base"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Image Section - Always visible */}
          <div className="z-10 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Replace with your actual image */}
              <img 
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Grocery Delivery Person" 
                className="w-full h-auto object-contain rounded-xl sm:rounded-2xl shadow-lg"
              />
              
              {/* OR If you want a local image */}
              {/* <img 
                src="/images/delivery-person.png" 
                alt="Delivery Person" 
                className="w-full h-auto object-contain rounded-xl sm:rounded-2xl shadow-lg"
              /> */}
              
              {/* Fallback placeholder */}
              <div className="hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-emerald-300">
                  <div className="text-center p-4 sm:p-8">
                    <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">🛒</div>
                    <p className="text-gray-600 font-medium text-sm sm:text-base">
                      Grocery Delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;