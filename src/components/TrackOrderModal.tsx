import React, { useState, useEffect } from 'react';
import { X, Search, PackageCheck, Clock, Truck, Send } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/defaultPerfumes';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderQuery, setOrderQuery] = useState('');
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('bp_recent_orders') || '[]');
        setRecentOrders(stored);
      } catch (e) {
        setRecentOrders([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleQueryWhatsApp = (orderId?: string) => {
    const id = orderId || orderQuery.trim();
    const text = `আসসালামু আলাইকুম, আমি আমার অর্ডার স্টেটাস জানতে চাই।${id ? `\nঅর্ডার আইডি / ফোন: ${id}` : ''}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0d1218] border border-white/10 rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-white">অর্ডার ট্র্যাক করুন</h3>
            <p className="text-xs text-slate-400">আপনার অর্ডারের বর্তমান অবস্থা সরাসরি জেনে নিন</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              অর্ডার আইডি অথবা মোবাইল নম্বর দিন
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="যেমন: BP-104928 অথবা 017xxxxxxxx"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={() => handleQueryWhatsApp()}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>খুঁজুন</span>
              </button>
            </div>
          </div>

          {/* Recent Orders in Local Storage */}
          {recentOrders.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                এই ডিভাইসে সাম্প্রতিক অর্ডারসমূহ:
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {recentOrders.map((ord, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-400">
                        আইডি: #{ord.id}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {ord.items?.length || 1} টি পারফিউম · ৳{ord.total?.toLocaleString('bn-BD')}
                      </div>
                    </div>
                    <button
                      onClick={() => handleQueryWhatsApp(ord.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1 hover:bg-emerald-900/50"
                    >
                      <Send className="w-3 h-3" /> WhatsApp আপডেট
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-amber-300">ডেলিভারি সময়সীমা:</div>
            <div>• ঢাকার ভিতরে: ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি।</div>
            <div>• ঢাকার বাহিরে: ২ থেকে ৩ কার্যদিবসের মধ্যে স্টিডফাস্ট / রেডেক্স মাধ্যমে হোম ডেলিভারি।</div>
          </div>
        </div>

        <button
          onClick={() => handleQueryWhatsApp()}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition-all"
        >
          সরাসরি WhatsApp হেল্পলাইনে মেসেজ দিন (+8801603724942)
        </button>
      </div>
    </div>
  );
};
