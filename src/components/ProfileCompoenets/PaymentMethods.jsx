import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, Star, Check, X, Wifi } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../../redux/api';

const cardGradients = [
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-700',
  'from-rose-500 to-pink-600',
  'from-blue-500 to-cyan-600',
  'from-orange-500 to-amber-600',
];

const emptyForm = { cardNumber: '', cardHolderName: '', expiryDate: '', paymentType: 'debit', upiId: '' };

const PaymentMethods = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    try {
      const res = await api.getPayments();
      setCards(res.data.data || res.data.paymentMethods || []);
    } catch { toast.error('Payment Methods Not Found'); }
    finally { setLoading(false); }
  };

  const formatCardNum = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = v => { const n = v.replace(/\D/g, '').slice(0, 4); return n.length >= 3 ? n.slice(0,2)+'/'+n.slice(2) : n; };
  const maskCard = num => { const d = num.replace(/\s/g,''); return '**** **** **** ' + d.slice(-4); };

  const handleAdd = async () => {
    if (form.paymentType !== 'upi' && (!form.cardNumber || !form.cardHolderName || !form.expiryDate)) {
      toast.error('Please fill all fields'); return;
    }
    if (form.paymentType === 'upi' && !form.upiId) {
      toast.error('UPI ID required hai'); return;
    }
    setSaving(true);
    try {
      const payload = { ...form, cardNumber: maskCard(form.cardNumber) };
      const res = await api.addPayment(payload);
      const newCard = res.data.data || res.data.paymentMethod;
      setCards(prev => [...prev, { ...newCard, _gradient: cardGradients[prev.length % cardGradients.length] }]);
      toast.success('Payment Method Added Successfully ✅');
      setForm(emptyForm); setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error aaya');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Is card ko hatayein?')) return;
    try {
      await api.deletePayment(id);
      setCards(prev => prev.filter(c => c._id !== id));
      toast.success('Card remove ho gaya');
    } catch { toast.error('Delete fail ho gaya'); }
  };

  const handleSetDefault = async (id) => {
    try {
      await api.setDefaultPayment(id);
      setCards(prev => prev.map(c => ({ ...c, isDefault: c._id === id })));
      toast.success('Default payment set ho gaya ⭐');
    } catch { toast.error('Default set nahi ho saka'); }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-800">Payment Methods</h2>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105">
          <Plus className="w-3.5 h-3.5" /> Add Card
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="mb-5 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-fadeSlideDown">
          {/* Payment Type */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['debit', 'credit', 'upi', 'netbanking'].map(t => (
              <button key={t} onClick={() => setForm(p => ({ ...p, paymentType: t }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all duration-200 ${form.paymentType === t ? 'bg-emerald-500 text-white scale-105 shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'}`}>
                {t}
              </button>
            ))}
          </div>

          {form.paymentType === 'upi' ? (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">UPI ID</label>
              <input value={form.upiId} onChange={e => setForm(p => ({ ...p, upiId: e.target.value }))}
                placeholder="yourname@upi"
                className="w-full mt-1 px-3 py-2.5 border-2 border-white focus:border-emerald-400 rounded-xl text-sm focus:outline-none transition-colors" />
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Card Number</label>
                <input value={form.cardNumber} onChange={e => setForm(p => ({ ...p, cardNumber: formatCardNum(e.target.value) }))}
                  placeholder="0000 0000 0000 0000" maxLength={19}
                  className="w-full mt-1 px-3 py-2.5 border-2 border-white focus:border-emerald-400 rounded-xl text-sm font-mono focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cardholder Name</label>
                <input value={form.cardHolderName} onChange={e => setForm(p => ({ ...p, cardHolderName: e.target.value }))}
                  placeholder="Ahmed Ali"
                  className="w-full mt-1 px-3 py-2.5 border-2 border-white focus:border-emerald-400 rounded-xl text-sm focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Expiry Date</label>
                <input value={form.expiryDate} onChange={e => setForm(p => ({ ...p, expiryDate: formatExpiry(e.target.value) }))}
                  placeholder="MM/YY" maxLength={5}
                  className="w-full mt-1 px-3 py-2.5 border-2 border-white focus:border-emerald-400 rounded-xl text-sm focus:outline-none transition-colors" />
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button onClick={() => { setShowForm(false); setForm(emptyForm); }}
              className="flex items-center gap-1 text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
            <button onClick={handleAdd} disabled={saving}
              className="flex items-center gap-1 text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-lg text-sm transition-all duration-200 disabled:opacity-60 hover:scale-105">
              <Check className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* Cards List */}
      {loading ? (
        <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />)}</div>
      ) : cards.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Koi payment method nahi hai</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card, i) => {
            const gradient = card._gradient || cardGradients[i % cardGradients.length];
            const isUpi = card.paymentType === 'upi';
            return (
              <div key={card._id}
                className={`relative bg-gradient-to-r ${gradient} rounded-2xl p-4 text-white overflow-hidden group`}>
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-white opacity-10 rounded-full" />
                <div className="absolute top-6 right-16 w-14 h-14 bg-white opacity-5 rounded-full" />
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {isUpi ? <Wifi className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                      <span className="text-xs font-bold uppercase opacity-80 tracking-wider">{card.paymentType}</span>
                      {card.isDefault && <span className="text-xs bg-white bg-opacity-25 px-2 py-0.5 rounded-full font-semibold">Default</span>}
                    </div>
                    {isUpi
                      ? <p className="font-semibold text-sm">{card.upiId}</p>
                      : <>
                          <p className="font-mono text-base font-bold tracking-widest">{card.cardNumber}</p>
                          <p className="text-xs opacity-80 mt-1">{card.cardHolderName} · {card.expiryDate}</p>
                        </>
                    }
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!card.isDefault && (
                      <button onClick={() => handleSetDefault(card._id)}
                        className="w-7 h-7 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center justify-center transition-colors" title="Set default">
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(card._id)}
                      className="w-7 h-7 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center justify-center transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;