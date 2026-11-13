import React, { useState, useMemo } from 'react';
import { Search, Sparkles, MessageSquarePlus, ArrowRight, RotateCcw, Facebook, MessageCircle } from 'lucide-react';
import { Perfume } from '../types';
import { ProductCard } from './ProductCard';
import { NeonHeadline } from './NeonHeadline';
import { WHATSAPP_NUMBER, FACEBOOK_URL } from '../data/defaultPerfumes';

interface CollectionProps {
  perfumes: Perfume[];
  onOpenDetails: (perfume: Perfume) => void;
  onOpenRequestModal: (initialName?: string) => void;
}

export const Collection: React.FC<CollectionProps> = ({
  perfumes,
  onOpenDetails,
  onOpenRequestModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPerfumes = useMemo(() => {
    if (!searchQuery.trim()) return perfumes;
    const q = searchQuery.toLowerCase().trim();
    return perfumes.filter((perfume) => {
      const matchName = perfume.name.toLowerCase().includes(q);
      const matchLongevity = perfume.longevity?.toLowerCase().includes(q);
      const matchOil = perfume.oilPurity?.toLowerCase().includes(q);
      return matchName || matchLongevity || matchOil;
    });
  }, [perfumes, searchQuery]);

  const handleQuickWhatsAppRequest = () => {
    const term = searchQuery.trim() || 'বিশেষ পারফিউম';
    const message = `✨ *পারফিউম রিকোয়েস্ট - বাদশাহ প্রিমিয়াম পারফিউম* ✨
----------------------------------
💎 *কাঙ্ক্ষিত পারফিউম:* ${term}
----------------------------------
আসসালামু আলাইকুম, আমি এই পারফিউমটি খুঁজছি। আপনাদের স্টকে কি এটি পাওয়া যাবে? দয়া করে জানাবেন।`;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="collection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header with Large Neon Headline & Bold Subtitle */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-emerald-400 mb-3.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>এক্সক্লুসিভ লাক্সারি সুবাস</span>
        </div>
        
        {/* Even larger 'আমাদের কালেকশন' headline */}
        <div className="flex justify-center mb-4">
          <NeonHeadline text="আমাদের কালেকশন" size="2xl" as="h2" />
        </div>
        
        {/* Bold Subtitle */}
        <p className="text-slate-100 font-bold max-w-2xl mx-auto text-base sm:text-xl leading-relaxed drop-shadow">
          আপনার পছন্দের পারফিউমটি সহজেই খুঁজে নিন। প্রতিটি পারফিউমেই রয়েছে দীর্ঘস্থায়ী সুবাস ও শতভাগ কোয়ালিটির নিশ্চয়তা।
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-10 max-w-3xl mx-auto bg-[#0e131a] p-3 sm:p-4 rounded-2xl border border-white/10 shadow-lg">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম দিয়ে পারফিউম খুঁজুন (যেমন: Bleu, Sauvage, Oud, Rouge, ইত্যাদি)..."
            className="w-full pl-12 pr-20 py-3.5 rounded-xl bg-[#090c10] border border-slate-700 text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
            >
              মুছুন
            </button>
          )}
        </div>
      </div>

      {/* Product Grid or Not-Found Animated State */}
      {filteredPerfumes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPerfumes.map((perfume) => (
            <ProductCard
              key={perfume.id}
              perfume={perfume}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        /* Empty Search State matching user's exact specification */
        <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#131b26]/95 via-[#0d131b]/95 to-[#080c12]/95 border-2 border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-center relative overflow-hidden animate-fadeIn">
          
          {/* Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Icon with pulsing aura */}
          <div className="relative inline-flex mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-3xl blur-md opacity-60 animate-pulse pointer-events-none" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1b2636] to-[#0c1219] border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-xl">
              <MessageSquarePlus className="w-8 h-8 text-amber-300" />
            </div>
          </div>

          {/* Exact Bold Headline requested */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-amber-300 leading-snug drop-shadow-md mb-4 max-w-xl mx-auto">
            আপনার পছন্দের পারফিউমটি এখানে নেই ? কোনো সমস্যা নেই ! নিচের বাটনে ক্লিক করে রিকোয়েস্ট করুন ।
          </h3>

          {/* Searched perfume tag */}
          {searchQuery && (
            <p className="text-sm sm:text-base text-slate-300 font-semibold mb-8">
              কাঙ্ক্ষিত পারফিউম: <span className="text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">"{searchQuery}"</span>
            </p>
          )}

          {/* Eye-catching animated Request Perfume button, WhatsApp and Facebook buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
            <button
              onClick={() => onOpenRequestModal(searchQuery.trim())}
              className="relative group w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-slate-950 font-black text-sm sm:text-base shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(52,211,153,0.8)] transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 overflow-hidden"
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              
              <MessageSquarePlus className="w-5 h-5 text-slate-950 animate-bounce" />
              <span className="tracking-wide">রিকোয়েস্ট পারফিউম</span>
              <Sparkles className="w-4 h-4 text-slate-950" />
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleQuickWhatsAppRequest}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#09261a] border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:bg-[#0d3424]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp-এ জানান</span>
            </button>

            {/* Facebook Button as requested */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#0d223f] border border-blue-500/50 hover:border-blue-400 text-blue-200 hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:bg-[#122e54]"
            >
              <Facebook className="w-4 h-4 text-blue-400 fill-blue-400" />
              <span>Facebook-এ জানান</span>
            </a>
          </div>

          {/* Reset Search Button */}
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white underline cursor-pointer transition-colors pt-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>সব পারফিউম আবার দেখুন</span>
          </button>

        </div>
      )}

    </section>
  );
};
