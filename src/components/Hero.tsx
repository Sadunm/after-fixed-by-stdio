import React from 'react';
import { CheckCircle2, ChevronRight, ArrowRight, Star, Sparkles, ShieldCheck, RotateCcw, Gift, Award } from 'lucide-react';
import { NeonHeadline } from './NeonHeadline';
import heroBannerImg from '../assets/images/hero_badshah_banner_1792161881584.jpg';

interface HeroProps {
  onScrollToCollection: () => void;
  onOpenWholesale: () => void;
  onOpenReviews: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToCollection,
  onOpenWholesale,
  onOpenReviews
}) => {
  return (
    <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden border-b border-white/10">
      {/* Background Image with Dark & Warm Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt="বাদশাহ প্রিমিয়াম পারফিউম ব্যানার"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000"
        />
        {/* Gradients ensuring high legibility of neon text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070a0e] via-[#070a0e]/90 to-transparent/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b0e] via-transparent to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Left shifted content) */}
          <div className="lg:col-span-7 xl:col-span-8 max-w-2xl">
            
            {/* Subtle English Brand Kicker */}
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-black/40 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Badshah Premium Artisanal Fragrance</span>
            </div>

            {/* Glowing Multi-Color Headline shifted slightly to side */}
            <div className="mb-5">
              <NeonHeadline
                text="কেন আমাদের থেকে পারফিউম কিনবেন"
                as="h1"
                size="hero"
                className="drop-shadow-lg"
              />
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200/95 font-medium leading-relaxed mb-7 max-w-xl drop-shadow">
              কারণ আমাদের প্রতিটা পারফিউমেই নিশ্চিত করা হয় সর্বোচ্চ কোয়ালিটি এবং যুক্তিসঙ্গত দাম। আপনার পছন্দের যেকোনো পারফিউম আমাদের কাছে পাবেন।
            </p>

            {/* Top Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <button
                onClick={onScrollToCollection}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#802a48] to-[#9b3a5b] text-white font-semibold text-sm sm:text-base hover:from-[#953255] hover:to-[#ae4367] transition-all shadow-lg shadow-rose-950/40 flex items-center gap-2 group cursor-pointer"
              >
                <span>আমাদের কালেকশন সমূহ</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenWholesale}
                className="px-6 py-3 rounded-lg border border-emerald-500/70 bg-[#06241a]/90 text-emerald-300 font-semibold text-sm sm:text-base hover:bg-emerald-900/40 hover:text-emerald-200 hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>পাইকারি কিনতে</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Special Offer & Loyalty Rewards Cards */}
            <div className="mb-6 space-y-2.5">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border border-amber-400/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] flex items-center gap-3 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-amber-300 animate-bounce" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-amber-200 leading-snug">
                  <span className="text-emerald-400 font-extrabold mr-1">বিশেষ অফার:</span>
                  ৩০ মিলি এর উপরে একাধিক পারফিউম অর্ডার করে ডেলিভারি চার্জ ফ্রি এবং সারপ্রাইজ গিফট উপভোগ করুন ।
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/15 via-[#18122a] to-emerald-500/15 border border-purple-400/40 shadow-sm flex items-center gap-3 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-purple-400/20 border border-purple-400/40 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-purple-200 leading-snug">
                  <span className="text-amber-400 font-extrabold mr-1">লয়্যালটি বেনিফিট:</span>
                  আমাদের নিয়মিত গ্রাহকদের জন্য রয়েছে আকর্ষণীয় পুরস্কার ও স্পেশাল ডিসকাউন্ট ।
                </p>
              </div>
            </div>

            {/* 3 Checkmark Value Props */}
            <div className="space-y-2.5 mb-7">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-sm sm:text-base font-bold text-emerald-300 drop-shadow">
                  লং-লাস্টিং দীর্ঘস্থায়ী ঘ্রাণ
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-sm sm:text-base font-bold text-emerald-300 drop-shadow">
                  হালাল পারফিউম ও আতর রয়েছে
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-sm sm:text-base font-bold text-emerald-300 drop-shadow">
                  সারাদেশে ক্যাশ অন ডেলিভারি
                </span>
              </div>
            </div>

            {/* Primary Big Green Button */}
            <button
              onClick={onOpenReviews}
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Star className="w-5 h-5 fill-slate-950 text-slate-950" />
              <span>আমাদের কাস্টমার রিভিউ গুলো দেখুন</span>
            </button>

          </div>

          {/* Right Column: Guarantee & Money Back Promise Box as requested */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#141d27]/95 via-[#0e1620]/95 to-[#090e15]/95 border-2 border-amber-400/50 p-6 sm:p-7 shadow-[0_0_40px_rgba(245,158,11,0.25)] backdrop-blur-md text-center relative overflow-hidden group hover:border-amber-400 transition-all duration-300">
              
              {/* Background ambient lighting */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Shield Icon Badge */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center">
                <div className="w-full h-full bg-[#0b0f14] rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-9 h-9 text-amber-400" />
                </div>
              </div>

              {/* Guarantee Headline */}
              <h3 className="text-xl sm:text-2xl font-black font-heading text-amber-300 uppercase tracking-wide mb-2 drop-shadow">
                বেস্ট কোয়ালিটির গ্যারান্টি
              </h3>

              {/* Bold Money Back Promise */}
              <div className="py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 my-3">
                <p className="text-base sm:text-lg font-black text-emerald-300 font-heading tracking-wide">
                  জিনিস পছন্দ না হলে টাকা ফেরত
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                আমাদের প্রতিটি পারফিউমেই পাবেন শতভাগ প্রিমিয়াম অরিজিনাল সুবাস ও দীর্ঘস্থায়ী ৭-১১ ঘণ্টার প্রজেকশন।
              </p>

              {/* Small Terms Apply Notice */}
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 font-medium">
                * শর্ত প্রযোজ্য
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
