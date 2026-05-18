// import React, { useState } from 'react';
// import { Lock, Eye, EyeOff, Shield, LogOut, AlertTriangle } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const SecuritySection = ({ setIsAuth }) => {
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState({ current: false, new: false, confirm: false });
//   const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

//   const handleChangePassword = async () => {
//     if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
//       toast.error('All fields required'); return;
//     }
//     if (form.newPassword !== form.confirmPassword) {
//       toast.error('New passwords do not match'); return;
//     }
//     if (form.newPassword.length < 6) {
//       toast.error('Password must be at least 6 characters'); return;
//     }
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         'http://localhost:5000/api/users/change-password',
//         { currentPassword: form.currentPassword, newPassword: form.newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Password changed successfully ✅');
//       setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to change password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     if (setIsAuth) setIsAuth(false);
//     toast.success('Logged out successfully');
//     navigate('/login');
//   };

//   const getStrength = (pwd) => {
//     if (!pwd) return null;
//     if (pwd.length < 6) return { label: 'Weak', color: 'bg-red-400', width: 'w-1/4' };
//     if (pwd.length < 10) return { label: 'Fair', color: 'bg-yellow-400', width: 'w-2/4' };
//     if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
//     return { label: 'Good', color: 'bg-emerald-400', width: 'w-3/4' };
//   };

//   const strength = getStrength(form.newPassword);

//   const PasswordInput = ({ field, placeholder }) => (
//     <div className="relative">
//       <input
//         type={show[field] ? 'text' : 'password'}
//         placeholder={placeholder}
//         value={form[field]}
//         onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
//         className="w-full px-3 py-2.5 pr-10 border-2 border-white rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition-colors"
//       />
//       <button type="button" onClick={() => setShow(p => ({ ...p, [field]: !p[field] }))}
//         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
//         {show[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//       </button>
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//       <div className="flex items-center gap-2 mb-5">
//         <Shield className="w-5 h-5 text-emerald-600" />
//         <h2 className="text-lg font-bold text-gray-800">Security</h2>
//       </div>

//       <div className="space-y-3">
//         {/* Change Password */}
//         <div className="border border-gray-100 rounded-xl overflow-hidden">
//           <button onClick={() => setShowForm(!showForm)}
//             className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
//                 <Lock className="w-4 h-4 text-emerald-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">Change Password</p>
//                 <p className="text-xs text-gray-500">Update your account password</p>
//               </div>
//             </div>
//             <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-lg">
//               {showForm ? 'Cancel' : 'Update'}
//             </span>
//           </button>

//           {showForm && (
//             <div className="px-4 pb-4 bg-emerald-50 border-t border-emerald-100">
//               <div className="pt-4 space-y-2.5">
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Password</label>
//                   <div className="mt-1"><PasswordInput field="currentPassword" placeholder="Enter current password" /></div>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Password</label>
//                   <div className="mt-1"><PasswordInput field="newPassword" placeholder="Enter new password" /></div>
//                   {strength && (
//                     <div className="mt-1.5">
//                       <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                         <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
//                       </div>
//                       <p className={`text-xs mt-0.5 font-medium ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</p>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Confirm New Password</label>
//                   <div className="mt-1"><PasswordInput field="confirmPassword" placeholder="Confirm new password" /></div>
//                 </div>
//                 <button onClick={handleChangePassword} disabled={loading}
//                   className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 mt-1">
//                   {loading ? 'Updating...' : 'Update Password'}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Logout */}
//         <div className="border border-red-100 rounded-xl overflow-hidden">
//           {!showLogoutConfirm ? (
//             <button onClick={() => setShowLogoutConfirm(true)}
//               className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors text-left">
//               <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
//                 <LogOut className="w-4 h-4 text-red-500" />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-red-600">Logout</p>
//                 <p className="text-xs text-gray-500">Sign out of your account</p>
//               </div>
//             </button>
//           ) : (
//             <div className="p-4 bg-red-50">
//               <div className="flex items-center gap-2 mb-3">
//                 <AlertTriangle className="w-4 h-4 text-red-500" />
//                 <p className="text-sm font-semibold text-red-700">Confirm Logout?</p>
//               </div>
//               <p className="text-xs text-red-600 mb-3">You will be signed out of your account.</p>
//               <div className="flex gap-2">
//                 <button onClick={() => setShowLogoutConfirm(false)}
//                   className="flex-1 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                   Cancel
//                 </button>
//                 <button onClick={handleLogout}
//                   className="flex-1 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors font-semibold">
//                   Yes, Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SecuritySection;
import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield, LogOut, AlertTriangle, Trash2, Mail, Check, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { api } from '../../redux/api';

const SecuritySection = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(null); // 'password' | 'logout' | 'delete'
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [deletePassword, setDeletePassword] = useState('');

  // Password strength
  const getStrength = pwd => {
    if (!pwd) return null;
    if (pwd.length < 6) return { label: 'Weak', pct: 25, color: '#ef4444' };
    if (pwd.length < 10) return { label: 'Fair', pct: 50, color: '#f59e0b' };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && pwd.length >= 10) return { label: 'Strong', pct: 100, color: '#059669' };
    return { label: 'Good', pct: 75, color: '#10b981' };
  };
  const strength = getStrength(pwForm.newPassword);

  const handleChangePassword = async () => {
    if (!pwForm.currentPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
      toast.error('Fill all fields'); return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error('Passwords do not match'); return;
    }
    if (pwForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long'); return;
    }
    setLoading(true);
    try {
      await api.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      toast.success('Password Changed Successfully ✅');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setActivePanel(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed');
    } finally { setLoading(false); }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.logout();
    } catch {}
    localStorage.removeItem('userInfo');
    if (setIsAuth) setIsAuth(false);
    toast.success('Logout👋');
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) { toast.error('Confirm your password to delete your account'); return; }
    setLoading(true);
    try {
      await api.deleteAccount({ password: deletePassword });
      localStorage.removeItem('userInfo');
      if (setIsAuth) setIsAuth(false);
      toast.success('Account deleted permanently 😢');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Account deletion failed');
    } finally { setLoading(false); }
  };

  const PwInput = ({ field, placeholder }) => (
    <div className="relative">
      <input type={show[field] ? 'text' : 'password'} value={pwForm[field]}
        onChange={e => setPwForm(p => ({ ...p, [field]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 pr-10 border-2 border-white focus:border-emerald-400 rounded-xl text-sm focus:outline-none transition-colors" />
      <button type="button" onClick={() => setShow(p => ({ ...p, [field]: !p[field] }))}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
        {show[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );

  const sections = [
    {
      id: 'password',
      icon: <Lock className="w-4 h-4 text-emerald-600" />,
      iconBg: 'bg-emerald-50',
      title: 'Change Password',
      desc: 'Update your account password',
      danger: false,
    },
    {
      id: 'logout',
      icon: <LogOut className="w-4 h-4 text-orange-500" />,
      iconBg: 'bg-orange-50',
      title: 'Logout',
      desc: 'Sign out of your account',
      danger: false,
    },
    {
      id: 'delete',
      icon: <Trash2 className="w-4 h-4 text-red-500" />,
      iconBg: 'bg-red-50',
      title: 'Delete Account',
      desc: 'Account And Data Permantely Deleted ',
      danger: true,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <Shield className="w-5 h-5 text-emerald-600" />
        <h2 className="text-lg font-bold text-gray-800">Security</h2>
      </div>

      <div className="space-y-2">
        {sections.map(sec => (
          <div key={sec.id} className={`rounded-xl overflow-hidden border transition-all duration-200 ${sec.danger ? 'border-red-100' : 'border-gray-100'}`}>
            {/* Row */}
            <button onClick={() => setActivePanel(activePanel === sec.id ? null : sec.id)}
              className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${sec.danger ? 'hover:bg-red-50' : 'hover:bg-gray-50'}`}>
              <div className={`w-9 h-9 ${sec.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {sec.icon}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${sec.danger ? 'text-red-600' : 'text-gray-800'}`}>{sec.title}</p>
                <p className="text-xs text-gray-500">{sec.desc}</p>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activePanel === sec.id ? 'rotate-90' : ''}`} />
            </button>

            {/* Panel: Change Password */}
            {activePanel === 'password' && sec.id === 'password' && (
              <div className="px-4 pb-4 bg-emerald-50 border-t border-emerald-100 animate-fadeSlideDown">
                <div className="pt-4 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Password</label>
                    <div className="mt-1"><PwInput field="currentPassword" placeholder="Old password" /></div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Password</label>
                    <div className="mt-1"><PwInput field="newPassword" placeholder="New password (min 6 chars)" /></div>
                    {strength && (
                      <div className="mt-1.5">
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${strength.pct}%`, background: strength.color }} />
                        </div>
                        <p className="text-xs mt-0.5 font-medium" style={{ color: strength.color }}>{strength.label}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Confirm New Password</label>
                    <div className="mt-1"><PwInput field="confirmPassword" placeholder="Confirm new password" /></div>
                    {pwForm.confirmPassword && pwForm.newPassword !== pwForm.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords do not match ❌</p>
                    )}
                    {pwForm.confirmPassword && pwForm.newPassword === pwForm.confirmPassword && (
                      <p className="text-xs text-emerald-600 mt-1">Passwords match ✅</p>
                    )}
                  </div>
                  <button onClick={handleChangePassword} disabled={loading}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 hover:scale-[1.02] flex items-center justify-center gap-2">
                    {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Updating...</> : <><Check className="w-4 h-4" /> Update Password</>}
                  </button>
                </div>
              </div>
            )}

            {/* Panel: Logout */}
            {activePanel === 'logout' && sec.id === 'logout' && (
              <div className="px-4 pb-4 bg-orange-50 border-t border-orange-100 animate-fadeSlideDown">
                <div className="pt-4">
                  <div className="flex items-start gap-2 mb-4 p-3 bg-white rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">IF you sign out, you will need to log in again.</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setActivePanel(null)}
                      className="flex-1 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleLogout} disabled={loading}
                      className="flex-1 py-2.5 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
                      {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <LogOut className="w-4 h-4" />}
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Delete Account */}
            {activePanel === 'delete' && sec.id === 'delete' && (
              <div className="px-4 pb-4 bg-red-50 border-t border-red-100 animate-fadeSlideDown">
                <div className="pt-4">
                  <div className="flex items-start gap-2 mb-4 p-3 bg-white rounded-xl border border-red-100">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-700">this action cannot be undone!</p>
                      <p className="text-xs text-gray-500 mt-0.5">Your profile, addresses, orders — all data will be permanently deleted.</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Confirm to delete your account</label>
                    <input type="password" value={deletePassword}
                      onChange={e => setDeletePassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full mt-1 px-3 py-2.5 border-2 border-white focus:border-red-400 rounded-xl text-sm focus:outline-none transition-colors" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setActivePanel(null); setDeletePassword(''); }}
                      className="flex-1 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleDeleteAccount} disabled={loading}
                      className="flex-1 py-2.5 text-sm text-white bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
                      {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecuritySection;