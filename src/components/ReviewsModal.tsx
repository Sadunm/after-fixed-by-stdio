import React from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { NeonHeadline } from './NeonHeadline';
import reviewsData from '../data/reviews.json';
import { ReviewItem } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const reviews: ReviewItem[] = reviewsData as ReviewItem[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0d1218] border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <NeonHeadline text="কাস্টমারদের আসল রিভিউ" size="lg" as="h3" className="justify-center" />
          <p className="text-xs text-slate-400 mt-1">
            সারাদেশের শত শত সন্তুষ্ট পারফিউম প্রেমীদের অভিজ্ঞতা
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{rev.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3 text-emerald-400" /> ভেরিফায়েড ক্রেতা
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{rev.location} · {rev.date}</div>
                </div>
                <div className="flex items-center text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="text-xs text-amber-300 font-medium">
                {rev.perfume}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-500 mb-4">
          * রিভিউ তালিকা সরাসরি <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded">src/data/reviews.json</code> ফাইল থেকে লোড হচ্ছে।
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
        >
          বন্ধ করুন
        </button>
      </div>
    </div>
  );
};
