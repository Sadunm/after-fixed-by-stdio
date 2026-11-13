import React, { useState, useEffect } from 'react';
import { 
  X, 
  Crown, 
  Droplets, 
  Clock, 
  ShoppingBag, 
  Zap, 
  Check, 
  Award,
  Plus,
  Minus,
  Sparkles,
  Gift
} from 'lucide-react';
import { Perfume, PerfumeSize } from '../types';
import { trackViewContent } from '../utils/metaPixel';
import { getPerfumeImageUrl } from '../utils/imageResolver';

interface ProductDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, size: string, price: number, quantity: number) => void;
  onDirectOrder: (perfume: Perfume, size: string, price: number, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  perfume,
  onClose,
  onAddToCart,
  onDirectOrder
}) => {
  if (!perfume) return null;

  const defaultSize = perfume.sizes?.[0] || { size: '30 ml', price: 1202 };
  const [selectedSize, setSelectedSize] = useState<PerfumeSize>(defaultSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Reset selected size and fire Meta Pixel ViewContent event tracking
  useEffect(() => {
    if (perfume) {
      const initialSize = perfume.sizes?.[0] || { size: '30 ml', price: 1202 };
      setSelectedSize(initialSize);
      trackViewContent(perfume, initialSize.size, initialSize.price);
    }
  }, [perfume?.id]);

  const subtotal = selectedSize.price * quantity;

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 50));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAdd = () => {
    onAddToCart(perfume, selectedSize.size, selectedSize.price, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleDirectBuy = () => {
    onDirectOrder(perfume, selectedSize.size, selectedSize.price, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#0d1218] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body - 2 Columns Desktop */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Perfume Bottle Studio View */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px] rounded-2xl bg-gradient-to-b from-[#111822] via-[#090e15] to-[#060a0f] border border-white/10 overflow-hidden flex items-center justify-center p-2 shadow-2xl group">
                
                {/* Backlight Glow matching Screenshot 2 */}
                <div className="absolute inset-0 bg-radial from-blue-900/30 via-transparent to-transparent opacity-70 pointer-events-none" />

                <img
                  src={getPerfumeImageUrl(perfume.image)}
                  alt={perfume.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl shadow-lg transform group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Subtle bottom pedestal shadow */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Title, Specs, Badges & Purchase Control */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Header Title & Tagline */}
              <div className="pr-8 mb-4">
                <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-wide text-amber-100 drop-shadow-sm uppercase">
                  {perfume.name}
                </h2>
                <div className="text-sm sm:text-base text-amber-300 font-serif italic font-semibold mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>GARAUNTEED LONG LASTING</span>
                </div>
              </div>

              {/* Feature Badges Row + Golden Quality Challenge Emblem */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 items-center">
                
                {/* 3 Pills Stack with updated labels */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-slate-200">
                    <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-semibold">GARAUNTEED LONG LASTING</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-slate-200">
                    <Droplets className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{perfume.oilPurity || 'Concentration of Oil - 55%'}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-slate-200">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-emerald-300">{perfume.longevity || 'Ultra Long Lasting Up To 8-9 Hours'}</span>
                  </div>
                </div>

                {/* Golden Quality Challenge Shield Badge exactly from Screenshot 2 */}
                <div className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-amber-950/40 via-black to-slate-900/90 border border-amber-500/40 shadow-inner">
                  <div className="flex items-center gap-3">
                    
                    {/* Ribbon Quality Emblem */}
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                        <Award className="w-6 h-6 text-slate-950" />
                      </div>
                      <div className="text-[9px] uppercase font-bold text-amber-300 tracking-tighter mt-1">
                        GUARANTEED
                      </div>
                      <div className="text-[8px] text-slate-400">
                        QUALITY
                      </div>
                    </div>

                    {/* Shield #1 Challenge */}
                    <div className="px-2.5 py-1.5 rounded-lg bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 text-slate-950 text-center font-black shadow-lg">
                      <div className="text-[9px] uppercase tracking-wider font-extrabold leading-none">
                        QUALITY
                      </div>
                      <div className="text-[8px] uppercase tracking-tight font-bold">
                        CHALLENGE
                      </div>
                      <div className="text-lg font-black leading-none my-0.5">
                        #1
                      </div>
                      <div className="text-[7px] uppercase font-bold tracking-tighter">
                        WE PROVE IT
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Size & Volume Selector Grid (30ml, 50ml, 100ml) */}
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-2.5">
                  {perfume.sizes.map((s) => {
                    const isSelected = selectedSize.size === s.size;
                    return (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s)}
                        className={`p-3 rounded-xl text-center transition-all cursor-pointer border ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_12px_rgba(52,211,153,0.3)] text-emerald-300'
                            : 'border-slate-800 bg-[#090d13] text-slate-300 hover:border-slate-600 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="text-sm font-bold">{s.size}</div>
                        <div className="text-xs font-semibold text-amber-400 mt-0.5">৳{s.price.toLocaleString('bn-BD')}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Subtext */}
                <div className="mt-2 text-xs text-emerald-400 font-medium">
                  সাইজ ও ভলিউম সিলেক্ট করুন: <span className="text-slate-300">নিশ্চিত প্রিমিয়াম কাঁচের ফ্লাকন</span>
                </div>
              </div>

              {/* Quantity and Subtotal Row */}
              <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-black/40 border border-white/5 mb-5">
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <span className="text-xs sm:text-sm text-slate-300 font-medium">পরিমাণ:</span>
                  <div className="flex items-center border border-slate-700 rounded-lg bg-[#070a0e] overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      className="px-2.5 py-1 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      aria-label="পরিমাণ কমান"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-sm font-bold text-white font-mono min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="px-2.5 py-1 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      aria-label="পরিমাণ বাড়ান"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 font-medium">সর্বমোট মূল্য</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                    ৳{subtotal.toLocaleString('bn-BD')}
                  </div>
                </div>

              </div>

              {/* Action Buttons: 'কার্টে add করুন' & 'সরাসরি অর্ডার করুন' */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className="py-3 px-4 rounded-xl border border-amber-500/50 hover:border-amber-400 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">কার্টে যোগ হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>কার্টে add করুন</span>
                    </>
                  )}
                </button>

                {/* Direct Order Button (Instant WhatsApp) */}
                <button
                  onClick={handleDirectBuy}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>সরাসরি অর্ডার করুন</span>
                </button>

              </div>

              {/* Special Offer Highlight */}
              <div className="mt-4 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 border border-amber-400/40 flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-amber-300 animate-bounce shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-amber-200">
                  <span className="text-emerald-400 font-extrabold mr-1">অফার:</span>
                  ৩০ মিলি এর উপরে একাধিক পারফিউম অর্ডার করে ডেলিভারি চার্জ ফ্রি এবং সারপ্রাইজ গিফট উপভোগ করুন ।
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
