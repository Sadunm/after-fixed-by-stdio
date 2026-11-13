import React, { useState } from 'react';
import { 
  ShoppingBag, 
  PhoneCall, 
  Phone, 
  Menu, 
  X, 
  Crown,
  Package,
  Gift,
  Sparkles
} from 'lucide-react';
import { WHATSAPP_NUMBER, FACEBOOK_URL } from '../data/defaultPerfumes';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenDeliveryInfo: () => void;
  onOpenTrackOrder: () => void;
  onOpenWholesale: () => void;
  onScrollToCollection: () => void;
  onScrollToStandard: () => void;
  onScrollToFAQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenDeliveryInfo,
  onOpenTrackOrder,
  onOpenWholesale,
  onScrollToCollection,
  onScrollToStandard,
  onScrollToFAQ
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openWhatsAppSupport = () => {
    const text = encodeURIComponent('আসসালামু আলাইকুম, বাদশাহ প্রিমিয়াম পারফিউম থেকে পরামর্শ ও সহায়তা প্রয়োজন।');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080c10]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      {/* Top Special Offer & Regular Customer Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-emerald-700 to-amber-600 text-white text-[11px] sm:text-xs font-bold py-1.5 px-3 shadow-sm border-b border-white/10 tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-4 text-center">
          <div className="flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-amber-200 animate-bounce shrink-0" />
            <span>৩০ মিলি এর উপরে একাধিক পারফিউম অর্ডার করে ডেলিভারি চার্জ ফ্রি এবং সারপ্রাইজ গিফট উপভোগ করুন ।</span>
          </div>
          <span className="hidden md:inline-block text-amber-300/80 font-black">•</span>
          <div className="flex items-center gap-1.5 text-amber-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>আমাদের নিয়মিত গ্রাহকদের জন্য রয়েছে আকর্ষণীয় পুরস্কার ও স্পেশাল ডিসকাউন্ট ।</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-950 p-[1.5px] shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-[#0b0f14] rounded-full flex items-center justify-center border border-amber-500/40">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide hover:text-emerald-400 transition-colors">
                  বাদশাহ প্রিমিয়াম পারফিউম
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>
              <span className="text-[11px] sm:text-xs text-amber-400/90 font-medium tracking-normal line-clamp-1">
                সস্তার সুবাস নয়, প্রিমিয়াম মন মাতানো ঘ্রানের আসল অভিজ্ঞতা
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4 text-[13px] font-medium text-slate-300">
            <button
              onClick={onScrollToCollection}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              কালেকশন
            </button>

            <button
              onClick={onOpenWholesale}
              className="px-3 py-1.5 rounded-md border border-emerald-500/50 text-emerald-400 bg-emerald-950/30 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all text-xs font-semibold tracking-wide flex items-center gap-1.5 cursor-pointer"
            >
              <Package className="w-3.5 h-3.5" />
              <span>পাইকারি</span>
            </button>

            <button
              onClick={onOpenTrackOrder}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              ট্র্যাক অর্ডার
            </button>

            <button
              onClick={onScrollToStandard}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              About Us
            </button>

            <button
              onClick={onScrollToFAQ}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              FAQ
            </button>

            <button
              onClick={onOpenDeliveryInfo}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              ডেলিভারি & COD
            </button>

            {/* Facebook Page Button */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-blue-500/50 bg-blue-950/40 text-blue-300 text-xs font-bold hover:bg-blue-900/50 hover:text-blue-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.2)]"
              title="আমাদের ফেসবুক পেইজে যান"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>ফেসবুক পেইজ</span>
            </a>

            {/* Direct Call Button */}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="px-3 py-1.5 rounded-lg border border-amber-500/50 bg-amber-950/40 text-amber-300 text-xs font-bold hover:bg-amber-900/50 hover:text-amber-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(245,158,11,0.2)]"
              title="সরাসরি ফোন করুন: ০১৬০৩৭২৪৯৪২"
            >
              <Phone className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>কল দিন</span>
            </a>

            {/* 24/7 WhatsApp Support */}
            <button
              onClick={openWhatsAppSupport}
              className="px-3.5 py-1.5 rounded-full border border-emerald-500/60 bg-emerald-950/40 text-emerald-300 text-xs font-medium hover:bg-emerald-900/50 hover:text-emerald-200 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ২৪/৭ চ্যাট
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white hover:border-emerald-500 transition-all cursor-pointer"
              aria-label="শপিং কার্ট"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md border border-blue-500/50 bg-blue-950/40 text-blue-400 text-xs flex items-center"
              title="ফেসবুক পেইজ"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="p-2 rounded-md border border-amber-500/50 bg-amber-950/40 text-amber-400 text-xs flex items-center cursor-pointer"
              title="সরাসরি কল দিন"
            >
              <Phone className="w-4 h-4 fill-amber-400 text-amber-400" />
            </a>

            <button
              onClick={openWhatsAppSupport}
              className="p-2 rounded-md border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 text-xs flex items-center cursor-pointer"
              title="২৪/৭ WhatsApp"
            >
              <PhoneCall className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 cursor-pointer"
              aria-label="শপিং কার্ট"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-white/10 space-y-2 bg-[#090d12]">
            <button
              onClick={() => { onScrollToCollection(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-md cursor-pointer"
            >
              কালেকশন সমূহ
            </button>

            <button
              onClick={() => { onOpenWholesale(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-emerald-400 hover:bg-slate-800 rounded-md font-semibold cursor-pointer"
            >
              পাইকারি / Wholesale ক্যাটালগ
            </button>

            <button
              onClick={() => { onOpenTrackOrder(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-md cursor-pointer"
            >
              অর্ডার ট্র্যাক করুন
            </button>

            <button
              onClick={() => { onScrollToStandard(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-md cursor-pointer"
            >
              আমাদের বৈশিষ্ট্য (About Us)
            </button>

            <button
              onClick={() => { onScrollToFAQ(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-md cursor-pointer"
            >
              সাধারণ প্রশ্নোত্তর (FAQ)
            </button>

            <button
              onClick={() => { onOpenDeliveryInfo(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded-md cursor-pointer"
            >
              ডেলিভারি চার্জ ও ক্যাশ অন ডেলিভারি
            </button>

            {/* Facebook Page Link in Mobile Menu */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2.5 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>আমাদের ফেসবুক পেইজে যান</span>
            </a>

            <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="py-2.5 text-center text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 fill-slate-950" /> সরাসরি কল দিন
              </a>
              <button
                onClick={() => { openWhatsAppSupport(); setMobileMenuOpen(false); }}
                className="py-2.5 text-center text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" /> WhatsApp সাপোর্ট
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
