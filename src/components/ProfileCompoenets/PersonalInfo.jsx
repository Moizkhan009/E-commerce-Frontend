// import React, { useState } from 'react';
// import { User, Mail, Phone, Edit3, Check, X } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const PersonalInfo = ({ user, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [form, setForm] = useState({
//     name: user?.name || '',
//     phone: user?.phone || '',
//   });

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.put(
//         'http://localhost:5000/api/users/profile',
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       onUpdate(res.data.user || { ...user, ...form });
//       toast.success('Profile updated ✅');
//       setIsEditing(false);
//     } catch {
//       toast.error('Update failed');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const fields = [
//     { icon: <User className="w-4 h-4" />, label: 'Full Name', key: 'name', type: 'text' },
//     { icon: <Mail className="w-4 h-4" />, label: 'Email Address', key: 'email', type: 'email', readOnly: true },
//     { icon: <Phone className="w-4 h-4" />, label: 'Phone Number', key: 'phone', type: 'tel' },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
//         {!isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-medium bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
//           >
//             <Edit3 className="w-3.5 h-3.5" /> Edit
//           </button>
//         ) : (
//           <div className="flex gap-2">
//             <button
//               onClick={() => { setIsEditing(false); setForm({ name: user?.name || '', phone: user?.phone || '' }); }}
//               className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
//             >
//               <X className="w-3.5 h-3.5" /> Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="flex items-center gap-1 text-white text-sm bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
//             >
//               <Check className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save'}
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="space-y-4">
//         {fields.map(({ icon, label, key, type, readOnly }) => (
//           <div key={key}>
//             <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
//               {icon} {label}
//             </label>
//             {isEditing && !readOnly ? (
//               <input
//                 type={type}
//                 value={form[key] || ''}
//                 onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
//                 className="w-full px-3 py-2.5 border-2 border-emerald-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
//               />
//             ) : (
//               <div className={`px-3 py-2.5 rounded-xl text-sm font-medium ${readOnly && isEditing ? 'bg-gray-50 text-gray-400' : 'text-gray-800'}`}>
//                 {key === 'email' ? user?.email : (form[key] || <span className="text-gray-400 italic">Not provided</span>)}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;
import React, { useState } from 'react';
import { User, Mail, Phone, Edit3, Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../../redux/api';

const PersonalInfo = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phoneNumber: user?.phoneNumber || '' });

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name required hai'); return; }
    setSaving(true);
    try {
      const res = await api.updateProfile(form);
      onUpdate(res.data.data);
      toast.success('Profile update ho gaya ✅');
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update fail ho gaya');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: user?.name || '', phoneNumber: user?.phoneNumber || '' });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105">
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel}
              className="flex items-center gap-1 text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm transition-colors">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1 text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 disabled:opacity-60 hover:scale-105">
              <Check className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            <User className="w-3.5 h-3.5" /> Full Name
          </label>
          {isEditing ? (
            <input type="text" value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-3 py-2.5 border-2 border-emerald-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
          ) : (
            <p className="text-gray-800 font-medium text-sm px-1">{user?.name || '—'}</p>
          )}
        </div>

        {/* Email — always readonly */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            <Mail className="w-3.5 h-3.5" /> Email Address
          </label>
          <div className="flex items-center gap-2">
            <p className="text-gray-800 font-medium text-sm px-1">{user?.email || '—'}</p>
            <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Cannot change</span>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            <Phone className="w-3.5 h-3.5" /> Phone Number
          </label>
          {isEditing ? (
            <input type="tel" value={form.phoneNumber}
              onChange={e => setForm(p => ({ ...p, phoneNumber: e.target.value }))}
              placeholder="+92 300 0000000"
              className="w-full px-3 py-2.5 border-2 border-emerald-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
          ) : (
            <p className="text-gray-800 font-medium text-sm px-1">{user?.phoneNumber || <span className="text-gray-400 italic text-xs">Not provided</span>}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;