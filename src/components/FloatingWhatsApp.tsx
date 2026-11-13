import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/defaultPerfumes';

export const FloatingWhatsApp: React.FC = () => {
  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent('আসসালামু আলাইকুম! বাদশাহ প্রিমিয়াম পারফিউম সম্পর্কে জানতে চাচ্ছি।');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
      
      {/* Direct Phone Call Button */}
      <div className="flex items-center gap-2 group">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline-block px-3 py-1 rounded-full bg-slate-900/95 text-amber-300 text-xs font-semibold border border-amber-500/40 shadow-lg pointer-events-none">
          সরাসরি কল দিন: ০১৬০৩৭২৪৯৪২
        </span>
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-[0_4px_16px_rgba(245,158,11,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="সরাসরি কল দিন"
          title="সরাসরি কল দিন"
        >
          <Phone className="w-5 h-5 fill-slate-950 text-slate-950" />
        </a>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="flex items-center gap-2 group">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline-block px-3 py-1 rounded-full bg-slate-900/95 text-emerald-300 text-xs font-semibold border border-emerald-500/40 shadow-lg pointer-events-none">
          WhatsApp-এ চ্যাট করুন
        </span>
        <button
          onClick={handleOpenWhatsApp}
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="WhatsApp-এ সরাসরি চ্যাট করুন"
          title="WhatsApp-এ মেসেজ দিন"
        >
          {/* Subtle Ping Animation Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

          {/* WhatsApp Icon */}
          <MessageCircle className="w-7 h-7 fill-white text-white drop-shadow-sm group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>

    </div>
  );
};
