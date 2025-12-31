import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');

  const slides = [
    {
      title: 'Fresh Vegetables',
      subtitle: 'Big discount',
      description: 'Save up to 50% off on your first order',
      bgColor: 'bg-emerald-100',
      image: '🥬'
    },
    {
      title: 'Organic Fruits',
      subtitle: 'Special offer',
      description: 'Get the best quality fruits delivered',
      bgColor: 'bg-orange-100',
      image: '🍊'
    },
    {
      title: 'Daily Essentials',
      subtitle: 'Great deals',
      description: 'Shop everyday products at low prices',
      bgColor: 'bg-blue-100',
      image: '🛒'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="relative rounded-3xl overflow-hidden shadow-lg">
        {/* Slides Container */}
        <div className="relative h-80 md:h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              } ${slide.bgColor}`}
            >
              <div className="flex items-center h-full">
                {/* Left Content */}
                <div className="w-1/2 px-12">
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
                    {slide.title}
                  </h1>
                  <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
                    {slide.subtitle}
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">
                    {slide.description}
                  </p>

                  {/* Email Subscription */}
                  <div className="flex gap-2 max-w-md">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Your email address"
                      className="flex-1 px-6 py-3 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-md"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="px-8 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors font-semibold shadow-md"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Right Image - Vegetables */}
                <div className="w-1/2 h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Shopping Bag */}
                    <div className="relative">
                      <div className="w-80 h-80 bg-white/40 rounded-tl-[100px] rounded-br-[100px] backdrop-blur-sm flex items-center justify-center">
                        {/* Vegetables Display */}
                        <div className="grid grid-cols-3 gap-4 p-8">
                          <div className="text-6xl">🥒</div>
                          <div className="text-6xl">🌽</div>
                          <div className="text-6xl">🍋</div>
                          <div className="text-6xl">🥕</div>
                          <div className="text-6xl">🥔</div>
                          <div className="text-6xl">🍊</div>
                          <div className="text-6xl">🥬</div>
                          <div className="text-6xl">🌶️</div>
                          <div className="text-6xl">🥥</div>
                        </div>
                      </div>
                      {/* Shopping Bag Handle */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-16 border-t-8 border-l-8 border-r-8 border-amber-200 rounded-t-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-emerald-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;