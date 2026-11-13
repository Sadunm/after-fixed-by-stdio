import React, { useState } from 'react';
import { X, Send, MessageSquarePlus, CheckCircle2, Facebook } from 'lucide-react';
import { WHATSAPP_NUMBER, FACEBOOK_URL } from '../data/defaultPerfumes';

interface RequestPerfumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillName?: string;
}

export const RequestPerfumeModal: React.FC<RequestPerfumeModalProps> = ({
  isOpen,
  onClose,
  prefillName = ''
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [perfumeName, setPerfumeName] = useState(prefillName);
  const [preferredSize, setPreferredSize] = useState('50 ml');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Update perfumeName when prefillName changes
  React.useEffect(() => {
    if (prefillName) {
      setPerfumeName(prefillName);
    }
  }, [prefillName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !perfumeName.trim()) return;

    // Create WhatsApp message boilerplate
    const message = `✨ *নতুন পারফিউম রিকোয়েস্ট - বাদশাহ প্রিমিয়াম পারফিউম* ✨
----------------------------------
👤 *কাস্টমারের নাম:* ${customerName.trim()}
📱 *ফোন নম্বর:* ${customerPhone.trim() || 'প্রদান করা হয়নি'}
💎 *কাঙ্ক্ষিত পারফিউমের নাম:* ${perfumeName.trim()}
📏 *পছন্দের সাইজ / ভলিউম:* ${preferredSize}
📝 *অতিরিক্ত তথ্য / নোট:* ${notes.trim() || 'কোনো নোট নেই'}
----------------------------------
এই পারফিউমটি কি স্টক বা কালেকশনে যুক্ত করা সম্ভব হবে? জানালে খুব উপকৃত হবো।`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    setWhatsappUrl(url);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    setSubmitted(true);
  };

  const handleFinish = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0d1218] border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <MessageSquarePlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-white">
              রিকোয়েস্ট পারফিউম
            </h3>
            <p className="text-xs text-amber-400 font-medium">
              আপনার পছন্দের যেকোনো পারফিউম আমরা সরাসরি সংগ্রহ করে দেব
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          ফর্মটি পূরণ করে সাবমিট করলে সরাসরি আমাদের WhatsApp নম্বরে (+8801603724942) বিস্তারিত চলে যাবে এবং আমরা আপনাকে সাথে সাথে রিপ্লাই দেব।
        </p>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-white mb-1">রিকোয়েস্ট তৈরি হয়েছে!</h4>
            <p className="text-xs text-slate-400 mb-5">WhatsApp লোড না হলে নিচের বাটনে ক্লিক করুন:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>সরাসরি WhatsApp-এ যান</span>
              </a>
              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                আপনার নাম *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ফোন নম্বর (ঐচ্ছিক)
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                কাঙ্ক্ষিত পারফিউম বা ব্রান্ডের নাম *
              </label>
              <input
                type="text"
                required
                value={perfumeName}
                onChange={(e) => setPerfumeName(e.target.value)}
                placeholder="যেমন: Dior Sauvage Elixir, Tom Ford Tuscan Leather, ইত্যাদি"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                পছন্দের সাইজ
              </label>
              <select
                value={preferredSize}
                onChange={(e) => setPreferredSize(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              >
                <option value="30 ml এক্সট্রাইট স্প্রে">30 ml এক্সট্রাইট স্প্রে</option>
                <option value="50 ml লাক্সারি বোতল">50 ml লাক্সারি বোতল</option>
                <option value="100 ml ফুল সাইজ">100 ml ফুল সাইজ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                অতিরিক্ত কোনো নোট (ঐচ্ছিক)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="যেমন: বেশি প্রজেকশন চাই, অথবা অ্যালকোহল মুক্ত আতর হতে হবে"
                className="w-full px-3.5 py-2 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp-এ সরাসরি রিকোয়েস্ট পাঠান</span>
              </button>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0d223f] border border-blue-500/50 hover:border-blue-400 text-blue-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition-all"
              >
                <Facebook className="w-4 h-4 text-blue-400 fill-blue-400" />
                <span>Facebook পেইজে মেসেজ দিয়ে জানান</span>
              </a>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
