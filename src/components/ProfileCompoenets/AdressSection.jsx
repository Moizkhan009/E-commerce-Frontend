// import React, { useState } from 'react';
// import { MapPin, Plus, Edit3, Trash2, Check, X, Home, Briefcase } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const AddressSection = ({ user }) => {
//   const [addresses, setAddresses] = useState(user?.addresses || []);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({ label: 'Home', street: '', city: '', state: '', zip: '', country: '' });

//   const handleAdd = () => {
//     if (!form.street || !form.city) { toast.error('Street and city required'); return; }
//     if (editingId !== null) {
//       setAddresses(prev => prev.map((a, i) => i === editingId ? { ...form } : a));
//       toast.success('Address updated ✅');
//       setEditingId(null);
//     } else {
//       setAddresses(prev => [...prev, { ...form }]);
//       toast.success('Address added ✅');
//     }
//     setForm({ label: 'Home', street: '', city: '', state: '', zip: '', country: '' });
//     setShowForm(false);
//   };

//   const handleEdit = (i) => {
//     setForm(addresses[i]);
//     setEditingId(i);
//     setShowForm(true);
//   };

//   const handleDelete = (i) => {
//     setAddresses(prev => prev.filter((_, idx) => idx !== i));
//     toast.success('Address removed');
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-lg font-bold text-gray-800">Saved Addresses</h2>
//         <button
//           onClick={() => { setShowForm(true); setEditingId(null); setForm({ label: 'Home', street: '', city: '', state: '', zip: '', country: '' }); }}
//           className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-medium bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
//         >
//           <Plus className="w-3.5 h-3.5" /> Add New
//         </button>
//       </div>

//       {/* Address Form */}
//       {showForm && (
//         <div className="mb-5 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
//           <div className="flex gap-3 mb-3">
//             {['Home', 'Work', 'Other'].map(l => (
//               <button key={l} onClick={() => setForm(p => ({ ...p, label: l }))}
//                 className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${form.label === l ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'}`}>
//                 {l === 'Home' ? <Home className="w-3 h-3" /> : l === 'Work' ? <Briefcase className="w-3 h-3" /> : <MapPin className="w-3 h-3" />} {l}
//               </button>
//             ))}
//           </div>
//           <div className="grid grid-cols-1 gap-2.5">
//             {[['street', 'Street Address', 'col-span-1'], ['city', 'City', ''], ['state', 'State / Province', ''], ['zip', 'ZIP Code', ''], ['country', 'Country', '']].map(([key, placeholder, cls]) => (
//               <input key={key} placeholder={placeholder} value={form[key]}
//                 onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
//                 className={`${cls} px-3 py-2 border-2 border-white rounded-lg text-sm text-gray-800 focus:outline-none focus:border-emerald-400 transition-colors`}
//               />
//             ))}
//           </div>
//           <div className="flex gap-2 mt-3">
//             <button onClick={() => { setShowForm(false); setEditingId(null); }}
//               className="flex items-center gap-1 text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
//               <X className="w-3.5 h-3.5" /> Cancel
//             </button>
//             <button onClick={handleAdd}
//               className="flex items-center gap-1 text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg text-sm transition-colors">
//               <Check className="w-3.5 h-3.5" /> {editingId !== null ? 'Update' : 'Save Address'}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Address List */}
//       {addresses.length === 0 ? (
//         <div className="text-center py-8 text-gray-400">
//           <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
//           <p className="text-sm">No addresses saved yet</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {addresses.map((addr, i) => (
//             <div key={i} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
//               <div className="flex gap-3">
//                 <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                   {addr.label === 'Home' ? <Home className="w-4 h-4 text-emerald-600" /> : addr.label === 'Work' ? <Briefcase className="w-4 h-4 text-emerald-600" /> : <MapPin className="w-4 h-4 text-emerald-600" />}
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{addr.label}</p>
//                   <p className="text-sm text-gray-700 mt-0.5">{addr.street}</p>
//                   <p className="text-xs text-gray-500">{[addr.city, addr.state, addr.zip, addr.country].filter(Boolean).join(', ')}</p>
//                 </div>
//               </div>
//               <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <button onClick={() => handleEdit(i)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-emerald-600 shadow-sm transition-colors">
//                   <Edit3 className="w-3.5 h-3.5" />
//                 </button>
//                 <button onClick={() => handleDelete(i)} className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm transition-colors">
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressSection;

import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit3, Trash2, Check, X, Home, Briefcase, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../../redux/api';

const emptyForm = { fullName: '', phoneNumber: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: 'Pakistan', addressType: 'home' };

const typeIcons = { home: <Home className="w-4 h-4" />, work: <Briefcase className="w-4 h-4" />, other: <MapPin className="w-4 h-4" /> };
const typeColors = { home: 'bg-emerald-50 text-emerald-600', work: 'bg-blue-50 text-blue-600', other: 'bg-purple-50 text-purple-600' };

const AddressSection = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchAddresses(); }, []);

  const fetchAddresses = async () => {
    try {
      const res = await api.getAddresses();
      setAddresses(res.data.data || res.data.addresses || []);
    } catch { toast.error('Addresses Not Found'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.addressLine1 || !form.city || !form.state || !form.pincode) {
      toast.error('Fields All Fill '); return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const res = await api.updateAddress(editingId, form);
        setAddresses(prev => prev.map(a => a._id === editingId ? (res.data.data || { ...a, ...form }) : a));
        toast.success('Address Updated ✅');
      } else {
        const res = await api.addAddress(form);
        const newAddr = res.data.data || res.data.address;
        setAddresses(prev => [...prev, newAddr]);
        toast.success('Address Added ✅');
      }
      setShowForm(false); setEditingId(null); setForm(emptyForm);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error aaya');
    } finally { setSaving(false); }
  };

  const handleEdit = (addr) => {
    setForm({ fullName: addr.fullName, phoneNumber: addr.phoneNumber, addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || '', city: addr.city, state: addr.state,
      pincode: addr.pincode, country: addr.country, addressType: addr.addressType });
    setEditingId(addr._id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Is address ko delete karein?')) return;
    try {
      await api.deleteAddress(id);
      setAddresses(prev => prev.filter(a => a._id !== id));
      toast.success('Address remove ho gaya');
    } catch { toast.error('Delete fail ho gaya'); }
  };

  const handleSetDefault = async (id) => {
    try {
      await api.setDefaultAddress(id);
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: a._id === id })));
      toast.success('Default address set ho gaya ⭐');
    } catch { toast.error('Default set nahi ho saka'); }
  };

  const Field = ({ label, name, placeholder, half }) => (
    <div className={half ? '' : 'col-span-2'}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <input value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
        placeholder={placeholder}
        className="w-full mt-1 px-3 py-2 border-2 border-white focus:border-emerald-400 rounded-xl text-sm text-gray-800 focus:outline-none transition-colors" />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-800">Saved Addresses</h2>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105">
          <Plus className="w-3.5 h-3.5" /> Add New
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-5 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-fadeSlideDown">
          {/* Type selector */}
          <div className="flex gap-2 mb-4">
            {['home', 'work', 'other'].map(t => (
              <button key={t} onClick={() => setForm(p => ({ ...p, addressType: t }))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${form.addressType === t ? 'bg-emerald-500 text-white shadow-sm scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'}`}>
                {typeIcons[t]} {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name *"       name="fullName"     placeholder="Ahmed Ali"       />
            <Field label="Phone *"           name="phoneNumber"  placeholder="+92 300 0000000" />
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address Line 1 *</label>
              <input value={form.addressLine1} onChange={e => setForm(p => ({ ...p, addressLine1: e.target.value }))}
                placeholder="Street, House/Flat no."
                className="w-full mt-1 px-3 py-2 border-2 border-white focus:border-emerald-400 rounded-xl text-sm text-gray-800 focus:outline-none transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address Line 2</label>
              <input value={form.addressLine2} onChange={e => setForm(p => ({ ...p, addressLine2: e.target.value }))}
                placeholder="Area, Landmark (optional)"
                className="w-full mt-1 px-3 py-2 border-2 border-white focus:border-emerald-400 rounded-xl text-sm text-gray-800 focus:outline-none transition-colors" />
            </div>
            <Field label="City *"    name="city"    placeholder="Karachi" half />
            <Field label="State *"   name="state"   placeholder="Sindh"   half />
            <Field label="Pincode *" name="pincode" placeholder="75500"   half />
            <Field label="Country"   name="country" placeholder="Pakistan" half />
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => { setShowForm(false); setEditingId(null); }}
              className="flex items-center gap-1 text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
            <button onClick={handleSubmit} disabled={saving}
              className="flex items-center gap-1 text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-lg text-sm transition-all duration-200 disabled:opacity-60 hover:scale-105">
              <Check className="w-3.5 h-3.5" /> {saving ? 'Saving...' : editingId ? 'Update' : 'Save Address'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Koi address nahi hai</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map(addr => (
            <div key={addr._id}
              className={`flex items-start justify-between p-4 rounded-xl transition-all duration-200 group border ${addr.isDefault ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-transparent hover:border-gray-200 hover:bg-gray-100'}`}>
              <div className="flex gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[addr.addressType] || typeColors.other}`}>
                  {typeIcons[addr.addressType] || typeIcons.other}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 capitalize">{addr.addressType}</p>
                    {addr.isDefault && <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-medium">Default</span>}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{addr.fullName} · {addr.phoneNumber}</p>
                  <p className="text-xs text-gray-500">{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}</p>
                  <p className="text-xs text-gray-500">{addr.city}, {addr.state} {addr.pincode}, {addr.country}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr._id)} title="Set default"
                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-500 shadow-sm transition-colors">
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}
                <button onClick={() => handleEdit(addr)}
                  className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-600 shadow-sm transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(addr._id)}
                  className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressSection;