import React from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { Perfume } from '../types';
import { getPerfumeImageUrl } from '../utils/imageResolver';

interface ProductCardProps {
  perfume: Perfume;
  onOpenDetails: (perfume: Perfume) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ perfume, onOpenDetails }) => {
  const startingPrice = perfume.sizes?.[0]?.price || 1202;
  const imageSrc = getPerfumeImageUrl(perfume.image);

  return (
    <div className="group relative rounded-2xl bg-gradient-to-b from-[#131922] via-[#0f141b] to-[#0a0e13] border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex flex-col">
      
      {/* Product Image Container */}
      <div 
        onClick={() => onOpenDetails(perfume)}
        className="relative aspect-square w-full bg-[#080b0f] overflow-hidden cursor-pointer"
      >
        <img
          src={imageSrc}
          alt={perfume.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e13] via-transparent to-transparent opacity-80" />

        {/* Hover Quick View Hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4" /> বিস্তারিত দেখুন
          </span>
        </div>
      </div>

      {/* Card Content - Clean, No description, No notes */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Displays: GARAUNTEED LONG LASTING */}
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1.5 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-serif font-bold text-[11px] sm:text-xs">
              GARAUNTEED LONG LASTING
            </span>
          </div>

          {/* Perfume Title */}
          <h3 
            onClick={() => onOpenDetails(perfume)}
            className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-emerald-300 transition-colors cursor-pointer mb-3 line-clamp-1"
          >
            {perfume.name}
          </h3>
        </div>

        {/* Action Button: 'বিস্তারিত' with budget indicator below */}
        <div className="pt-2 border-t border-white/5">
          <button
            onClick={() => onOpenDetails(perfume)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-500 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <Eye className="w-4 h-4" />
            <span>বিস্তারিত</span>
          </button>

          {/* Budget indicator (starting with 30 ml) */}
          <div className="text-center mt-2 text-[11px] font-semibold text-emerald-400/95 tracking-wide">
            ৳{startingPrice} থেকে শুরু (৩০ মিলি থেকে ১০০ মিলি)
          </div>
        </div>

      </div>

    </div>
  );
};
