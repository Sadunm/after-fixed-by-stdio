import React from 'react';
import { Crown, Phone, Mail, MapPin, Truck, ShieldCheck, Heart } from 'lucide-react';
import { WHATSAPP_NUMBER, FACEBOOK_URL, DELIVERY_CHARGE_INSIDE_DHAKA, DELIVERY_CHARGE_OUTSIDE_DHAKA } from '../data/defaultPerfumes';

interface FooterProps {
  onScrollToCollection: () => void;
  onOpenDeliveryInfo: () => void;
  onOpenWholesale: () => void;
  onScrollToFAQ?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToCollection,
  onOpenDeliveryInfo,
  onOpenWholesale,
  onScrollToFAQ
}) => {
  return (
    <footer className="bg-[#05070a] border-t border-white/10 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0b0f14] rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-bold font-heading text-white">
                বাদশাহ প্রিমিয়াম পারফিউম
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              সস্তার সুবাস নয়, প্রিমিয়াম মন মাতানো ঘ্রানের আসল অভিজ্ঞতা। আমরা শতভাগ অরিজিনাল ফ্লেভার অয়েল সরবরাহ করি যা দীর্ঘস্থায়ী সুবাস ছড়ায়।
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>সারাদেশে ক্যাশ অন ডেলিভারি (COD)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>ডেলিভারির সময় চেক করে রিসিভ করার অনুরোধ (কোন ক্ষতিপূরণ দেওয়া হবে না)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              গুরুত্বপূর্ণ লিঙ্ক
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onScrollToCollection} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  আমাদের পারফিউম কালেকশন
                </button>
              </li>
              <li>
                <button onClick={onOpenWholesale} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  পাইকারি / Wholesale ক্যাটালগ
                </button>
              </li>
              {onScrollToFAQ && (
                <li>
                  <button onClick={onScrollToFAQ} className="hover:text-emerald-400 transition-colors cursor-pointer">
                    সাধারণ জিজ্ঞাসা (FAQ)
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenDeliveryInfo} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  ডেলিভারি চার্জ ও শর্তাবলী
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery & Direct WhatsApp/Facebook Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              ডেলিভারি ও যোগাযোগ
            </h4>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>ঢাকার ভিতরে চার্জ:</span>
                <span className="font-bold text-emerald-400 font-mono">৳{DELIVERY_CHARGE_INSIDE_DHAKA}</span>
              </div>
              <div className="flex justify-between">
                <span>ঢাকার বাহিরে চার্জ:</span>
                <span className="font-bold text-amber-400 font-mono">৳{DELIVERY_CHARGE_OUTSIDE_DHAKA}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              {/* Facebook Page Link */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>অফিসিয়াল ফেসবুক পেইজ</span>
              </a>

              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>সরাসরি কল: ০১৬০৩৭২৪৯৪২</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>WhatsApp: +8801603724942</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 shrink-0" />
                <span>badshahpremiumperfume@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} বাদশাহ প্রিমিয়াম পারফিউম (Badshah Premium Perfume). সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Fragrance Connoisseurs</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
