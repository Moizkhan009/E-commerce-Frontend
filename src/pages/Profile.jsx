import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import ProfileHeader from './components/ProfileHeader';
import ProfileHeader from '../components/ProfileCompoenets/Profileheader';
// import PersonalInfo from './components/PersonalInfo';
import PersonalInfo from '../components/ProfileCompoenets/PersonalInfo';
// import AddressSection from './components/AddressSection';
import AddressSection from '../components/ProfileCompoenets/AdressSection';
// import PaymentMethods from './components/PaymentMethods';
import PaymentMethods from '../components/ProfileCompoenets/PaymentMethods';
// import OrdersSection from './components/OrdersSection';
import OrdersSection from '../components/ProfileCompoenets/OrderSection';
// import WishlistSection from './components/WishlistSection';
import WishlistSection from '../components/ProfileCompoenets/WhishlistSection';
// import SecuritySection from './components/SecuritySection';
import SecuritySection from '../components/ProfileCompoenets/SecuritySection';

// Skeleton loader
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-4/5" />
      <div className="h-4 bg-gray-100 rounded w-3/5" />
    </div>
  </div>
);

const Profile = ({ setIsAuth }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // const token = localStorage.getItem('token');
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const token = userInfo?.token;
      if (!userInfo || !token) { setError('Please login first'); setLoading(false); return; }

      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
      setLoading(false);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 1500);
      }
    }
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 max-w-sm w-full">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Access Error</h2>
          <p className="text-gray-500 text-sm mb-5">{error}</p>
          <button onClick={() => navigate('/login')}
            className="w-full py-2.5 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top decorative band */}
      <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Loading Skeletons */}
        {loading ? (
          <div className="space-y-5">
            {/* Header skeleton */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-28 bg-gray-200" />
              <div className="p-6 flex items-end gap-4 -mt-12">
                <div className="w-24 h-24 bg-gray-200 rounded-2xl" />
                <div className="pb-2 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-32" />
                  <div className="h-3 bg-gray-100 rounded w-44" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Profile Header — full width */}
            <ProfileHeader user={user} />

            {/* 2-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left column */}
              <div className="space-y-5">
                <PersonalInfo user={user} onUpdate={setUser} />
                <AddressSection user={user} />
                <PaymentMethods />
              </div>

              {/* Right column */}
              <div className="space-y-5">
                <OrdersSection />
                <WishlistSection />
                <SecuritySection setIsAuth={setIsAuth} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 