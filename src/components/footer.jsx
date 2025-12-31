import React from 'react';
import {
  MapPin, Phone, Mail, Clock,
  Facebook, Twitter, Instagram, Youtube
} from 'lucide-react';

const Footer = () => {

  const sections = {
    Company: [
      'About Us','Delivery Information','Privacy Policy',
      'Terms & Conditions','Contact Us','Careers'
    ],
    Account: [
      'Sign In','My Account','Wishlist',
      'Track Order','Help Center'
    ],
    Corporate: [
      'Become a Vendor','Affiliate Program',
      'Suppliers','Accessibility'
    ],
    Popular: [
      'Milk & Dairy','Butter','Eggs',
      'Cheese','Tea & Kombucha'
    ]
  };

  return (
    <footer className="bg-[#f8faf9] border-t border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* ===== TOP GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
             
              <div>
                <h1 className="text-emerald-600 text-2xl font-extrabold">
                  Nest
                </h1>
                <p className="text-xs tracking-wide text-gray-500">
                  MART & GROCERY
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-5 max-w-sm">
              Premium grocery ecommerce platform delivering
              quality products with trust & care.
            </p>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-2">
                <MapPin size={16} className="text-emerald-500 mt-1" />
                <span>KARACHI, PAKISTAN</span>
              </div>
              <div className="flex gap-2">
                <Phone size={16} className="text-emerald-500" />
                <span>(+92) 324-244-3882</span>
              </div>
              <div className="flex gap-2">
                <Mail size={16} className="text-emerald-500" />
                <span>support@nest.com</span>
              </div>
              <div className="flex gap-2">
                <Clock size={16} className="text-emerald-500" />
                <span>Mon – Sat: 10AM – 6PM</span>
              </div>
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-emerald-600 font-semibold mb-4 tracking-wide">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

       

        {/* ===== BOTTOM BAR ===== */}
        <div className="mt-10 pt-6 border-t border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2025 Nest Grocery. Crafted with care.
          </p>

          <div className="flex gap-3">
            {[Facebook,Twitter,Instagram,Youtube].map((Icon,i)=>(
              <button
                key={i}
                className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition"
              >
                <Icon size={16}/>
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
