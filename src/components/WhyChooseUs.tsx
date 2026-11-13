import React from 'react';
import { 
  Sparkles, 
  Clock, 
  Banknote, 
  Droplet, 
  ShieldCheck, 
  Headset, 
  Truck 
} from 'lucide-react';
import { NeonHeadline } from './NeonHeadline';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: '১০০% প্রিমিয়াম ইনগ্রেডিয়েন্টস',
      desc: 'একদম বেস্ট কোয়ালিটির সব উপাদান দিয়ে বানানো হয় পারফিউম'
    },
    {
      icon: Clock,
      title: 'দীর্ঘস্থায়ী সুবাসের নিশ্চয়তা',
      desc: 'আমাদের কাস্টমার দের রিভিউ অনুযায়ী পারফিউম অনেক লং লাস্টিং হয়'
    },
    {
      icon: Banknote,
      title: 'যৌক্তিক দাম',
      desc: 'আমরা কোন নিম্নমানের উপাদান দিয়ে পারফিউম বানাই না।'
    },
    {
      icon: Droplet,
      title: 'অ্যালকোহলবিহীন পারফিউম পাওয়া যায়',
      desc: 'ত্বকের জন্য সম্পূর্ণ ঝুঁকিমুক্ত এবং ইবাদতের উপযোগী ১০০% খাঁটি অ্যালকোহলবিহীন এসেন্স।'
    },
    {
      icon: ShieldCheck,
      title: 'সারাদেশে ক্যাশ অন ডেলিভারি এর সুবিধা',
      desc: 'কোন প্রকার অগ্রিম পেমেন্ট করা লাগে না। প্রোডাক্ট হাতে পেয়ে মূল্য পরিশোধ করবেন।'
    },
    {
      icon: Headset,
      title: '২৪/৭ কাস্টমার সাপোর্ট ও গ্যারান্টি',
      desc: 'পারফিউম বা আতর সংক্রান্ত যেকোনো পরামর্শের জন্য সার্বক্ষণিক ডেডিকেটেড সাপোর্ট।'
    }
  ];

  return (
    <section id="standard" className="py-20 bg-[#090d12] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header from Screenshot 3 */}
        <div className="text-center mb-14">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3 font-mono">
            THE BADSHAH STANDARD
          </div>
          
          <div className="flex justify-center">
            <NeonHeadline
              text="WHY DISCERNING CUSTOMERS CHOOSE US"
              size="xl"
              as="h2"
              className="font-serif uppercase"
            />
          </div>
        </div>

        {/* 6 Feature Grid Cards matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-7 rounded-2xl bg-[#0e1319] border border-white/5 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] group"
              >
                {/* Icon in Rounded Box from Screenshot 3 */}
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 group-hover:border-emerald-400 group-hover:bg-emerald-950/40 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading tracking-wide">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
