import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  MessageCircle, 
  Send, 
  Plus, 
  Check, 
  ArrowLeft, 
  Boxes, 
  ShieldCheck
} from 'lucide-react';
import { WholesaleItem, CartItem } from '../types';
import wholesaleData from '../data/wholesale.json';
import { WHATSAPP_NUMBER, MESSENGER_URL } from '../data/defaultPerfumes';
import { NeonHeadline } from './NeonHeadline';
import { getPerfumeImageUrl } from '../utils/imageResolver';

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const WholesaleModal: React.FC<WholesaleModalProps> = ({
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({});

  const items: WholesaleItem[] = wholesaleData as WholesaleItem[];

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  if (!isOpen) return null;

  const openWhatsAppUrl = (text: string) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenWhatsAppGeneral = () => {
    openWhatsAppUrl('আসসালামু আলাইকুম! বাদশাহ প্রিমিয়াম পারফিউমের পাইকারি ক্যাটালগ দেখে যোগাযোগ করছি।');
  };

  const handleOpenMessenger = () => {
    window.open(MESSENGER_URL, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppItemInquiry = (item: WholesaleItem) => {
    const total50ml = item.pricePerMl * item.minVolumeMl;
    const text = `আসসালামু আলাইকুম! আমি বাদশাহ পাইকারি পোর্টাল থেকে এই আইটেমটি অর্ডার/জানতে চাচ্ছি:
📦 *পারফিউম:* ${item.name} (${item.subtitle || 'Wholesale'})
💰 *প্রতি মিলির দর:* ৳${item.pricePerMl.toFixed(2)} / ml
🏷️ *৫০ মিলি পাইকারি মূল্য:* ৳${total50ml.toFixed(2)}
অনুগ্রহ করে বিস্তারিত জানান।`;
    openWhatsAppUrl(text);
  };

  const handleAddWholesaleToCart = (item: WholesaleItem) => {
    const total50ml = item.pricePerMl * item.minVolumeMl;
    const cartItem: CartItem = {
      id: `wholesale-${item.id}`,
      perfumeId: item.id,
      name: `${item.name} (পাইকারি)`,
      image: getPerfumeImageUrl('bleudechannel.jpg'),
      size: `${item.minVolumeMl} ml পাইকারি`,
      price: total50ml,
      quantity: 1,
      isWholesale: true
    };
    onAddToCart(cartItem);

    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl bg-[#090d12] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* Top Pill from Screenshot */}
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 text-xs font-semibold tracking-wide shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Boxes className="w-3.5 h-3.5 text-emerald-400" />
              <span>অফিসিয়াল পাইকারি পোর্টাল / Wholesale Portal</span>
            </div>
          </div>

          {/* Large Neon Glow Title from Screenshot */}
          <div className="text-center mb-6">
            <NeonHeadline
              text="বাদশাহ প্রিমিয়াম পাইকারি ক্যাটালগ"
              size="2xl"
              as="h2"
              className="justify-center"
            />
          </div>

          {/* 3 Action Buttons matching Screenshot */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {/* WhatsApp Inbox */}
            <button
              onClick={handleOpenWhatsAppGeneral}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.35)] cursor-pointer transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp ইনবক্স</span>
            </button>

            {/* Messenger Inbox */}
            <button
              onClick={handleOpenMessenger}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.35)] cursor-pointer transition-all active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Messenger ইনবক্স</span>
            </button>

            {/* Return to Retail Shop */}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>রিটেইল শপে ফিরে যান</span>
            </button>
          </div>

          {/* Highlight Banner matching Screenshot: "মিনিমাম ৫০ মিলি নিতে হবে" */}
          <div className="mb-6 p-4 rounded-xl bg-[#07130e] border border-emerald-500/40 text-center shadow-inner">
            <span className="text-base sm:text-lg font-black text-amber-400 font-heading tracking-wide">
              মিনিমাম ৫০ মিলি নিতে হবে
            </span>
          </div>

          {/* Search Box and Counter Strip matching Screenshot */}
          <div className="mb-4 p-3 rounded-xl bg-[#0d1218] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পারফিউমের নাম দিয়ে সার্চ করুন..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#070a0e] border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Status counter */}
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="font-semibold">
                <strong className="text-amber-400 font-mono text-sm">{filteredItems.length}</strong> টি পারফিউম তালিকাভুক্ত
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> ১০০% পিওর অয়েল
              </span>
            </div>
          </div>

          {/* Mobile View: Compact Card-View (No Horizontal Scrolling) */}
          <div className="sm:hidden space-y-3 mb-4">
            {filteredItems.map((item, index) => {
              const price50ml = item.pricePerMl * item.minVolumeMl;
              const isAdded = addedItems[item.id];
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#0d1218] border border-white/10 flex flex-col gap-2.5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm font-heading truncate">
                          {item.name}
                        </div>
                        {item.subtitle && (
                          <div className="text-[11px] text-emerald-400 font-mono">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-black/40 border border-white/5 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">প্রতি মিলির দর:</div>
                      <div className="font-mono font-bold text-amber-300">
                        ৳{item.pricePerMl.toFixed(2)} / ml
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">৫০ মিলি পাইকারি:</div>
                      <div className="font-mono font-extrabold text-amber-400 text-sm">
                        ৳{price50ml.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleAddWholesaleToCart(item)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-400 text-slate-950'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>যোগ হয়েছে!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>কার্টে ৫০ মিলি যোগ করুন</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleWhatsAppItemInquiry(item)}
                      className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center cursor-pointer"
                      title="WhatsApp-এ জানুন"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop / Tablet View: Full Table matching Screenshot */}
          <div className="hidden sm:block rounded-xl border border-white/10 overflow-hidden bg-[#0d1218]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40 text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <th className="py-3 px-3 sm:px-4 text-emerald-400">#</th>
                    <th className="py-3 px-3 sm:px-4">পারফিউমের নাম (PERFUME NAME)</th>
                    <th className="py-3 px-3 sm:px-4 text-right">প্রতি মিলির দর</th>
                    <th className="py-3 px-3 sm:px-4 text-right">৫০ মিলি পাইকারি</th>
                    <th className="py-3 px-3 sm:px-4 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                  {filteredItems.map((item, index) => {
                    const price50ml = item.pricePerMl * item.minVolumeMl;
                    const isAdded = addedItems[item.id];
                    return (
                      <tr 
                        key={item.id}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Index */}
                        <td className="py-3.5 px-3 sm:px-4 font-mono font-bold text-slate-400">
                          {index + 1}
                        </td>

                        {/* Perfume Name */}
                        <td className="py-3.5 px-3 sm:px-4">
                          <div className="font-bold text-white font-heading">
                            {item.name}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-emerald-400 font-mono">
                              {item.subtitle}
                            </div>
                          )}
                        </td>

                        {/* Price per ml */}
                        <td className="py-3.5 px-3 sm:px-4 text-right font-mono font-bold text-amber-300">
                          ৳{item.pricePerMl.toFixed(2)} <span className="text-[11px] font-sans text-slate-400">/ ml</span>
                        </td>

                        {/* 50ml Wholesale price */}
                        <td className="py-3.5 px-3 sm:px-4 text-right font-mono font-extrabold text-amber-400">
                          ৳{price50ml.toFixed(2)}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-3 sm:px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Add to Cart button */}
                            <button
                              onClick={() => handleAddWholesaleToCart(item)}
                              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-950 font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                isAdded
                                  ? 'bg-emerald-400'
                                  : 'bg-emerald-500 hover:bg-emerald-400'
                              }`}
                              title="কার্টে ৫০ মিলি যোগ করুন"
                            >
                              {isAdded ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Plus className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* WhatsApp Inquiry Button */}
                            <button
                              onClick={() => handleWhatsAppItemInquiry(item)}
                              className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 hover:bg-emerald-900/60 text-emerald-400 transition-colors cursor-pointer"
                              title="WhatsApp-এ এই পারফিউম সম্পর্কে জানুন"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* JSON upload note for developer / owner */}
          <div className="mt-4 text-center text-xs text-slate-500">
            * পাইকারি তালিকা সরাসরি <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded">src/data/wholesale.json</code> ফাইল থেকে লোড হচ্ছে।
          </div>

        </div>

      </div>
    </div>
  );
};
