// import React from 'react';
// import { Camera, Mail, Shield } from 'lucide-react';

// const ProfileHeader = ({ user }) => {
//   const initials = user?.name
//     ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
//     : 'U';

//   return (
//     <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
//       {/* Banner */}
//       <div className="h-28 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 relative">
//         <div className="absolute inset-0 opacity-20"
//           style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}
//         />
//       </div>

//       {/* Avatar */}
//       <div className="px-6 pb-6">
//         <div className="flex items-end justify-between -mt-12 mb-4">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
//               {initials}
//             </div>
//             <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-md hover:bg-emerald-600 transition-colors">
//               <Camera className="w-3.5 h-3.5 text-white" />
//             </button>
//           </div>
//           {user?.role === 'admin' && (
//             <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
//               <Shield className="w-3 h-3" /> Admin
//             </span>
//           )}
//         </div>

//         <h1 className="text-2xl font-bold text-gray-800">{user?.name || 'User'}</h1>
//         <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
//           <Mail className="w-3.5 h-3.5" />
//           <span>{user?.email || 'No email'}</span>
//         </div>
//         <p className="text-xs text-gray-400 mt-1">
//           Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProfileHeader;
import React from 'react';
import { Camera, Mail, Phone, Shield, Calendar } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-fadeSlideDown">
      {/* Banner */}
      <div className="h-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #059669 0%, #0d9488 60%, #0891b2 100%)' }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white opacity-5 rounded-full" />
        <div className="absolute top-4 right-24 w-20 h-20 bg-white opacity-5 rounded-full" />
        <div className="absolute -bottom-6 left-1/4 w-36 h-36 bg-white opacity-5 rounded-full" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 mb-4 gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #059669, #0d9488)' }}>
              {user?.profilePicture
                ? <img src={user.profilePicture} alt={user?.name} className="w-full h-full object-cover" />
                : initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          {user?.isActive && (
            <span className="self-start sm:self-auto flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
              <Shield className="w-3 h-3" /> Verified Account
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{user?.name || 'User'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
          <span className="flex items-center gap-1.5 text-gray-500 text-sm">
            <Mail className="w-3.5 h-3.5 text-emerald-500" />{user?.email}
          </span>
          {user?.phoneNumber && (
            <span className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />{user.phoneNumber}
            </span>
          )}
          {user?.createdAt && (
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Calendar className="w-3 h-3" />
              Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;