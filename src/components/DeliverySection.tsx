import React, { useState } from 'react';
import { Truck, ShieldCheck, MapPin, CheckCircle, Clock, Gift } from 'lucide-react';
import { NeonHeadline } from './NeonHeadline';
import { DELIVERY_CHARGE_INSIDE_DHAKA, DELIVERY_CHARGE_OUTSIDE_DHAKA } from '../data/defaultPerfumes';

export const DeliverySection: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<'inside' | 'outside'>('inside');

  return (
    <section id="delivery" className="py-16 bg-[#070a0e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container with Emerald & Gold Border */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0d141d] via-[#101b24] to-[#0a1017] border border-emerald-500/30 p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading and Highlights */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-4">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>নিরাপদ ও দ্রুততম হোম ডেলিভারি</span>
              </div>

              <div className="mb-4">
                <NeonHeadline text="সারাদেশে ক্যাশ অন ডেলিভারি" size="lg" as="h2" />
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-medium">
                কোনো প্রকার অগ্রিম পেমেন্টের ঝামেলা নেই! আপনার ঠিকানায় পারফিউম পৌঁছানোর পর প্যাকেট দেখে নিশ্চিন্তে ডেলিভারিম্যানকে টাকা পরিশোধ করবেন।
              </p>

              {/* Delivery Charge Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Inside Dhaka */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      ঢাকার ভিতরে
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40">
                      ২৪-৪৮ ঘণ্টা
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
                    <span className="text-emerald-400 font-sans">ডেলিভারি চার্জ:</span>
                    <span className="text-amber-300">৳{DELIVERY_CHARGE_INSIDE_DHAKA}</span>
                    <span className="text-xs font-normal text-slate-400 font-sans">টাকা</span>
                  </div>
                </div>

                {/* Outside Dhaka */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 transition-all shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      ঢাকার বাহিরে
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 font-bold border border-amber-500/40">
                      ২-৩ দিন
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
                    <span className="text-amber-400 font-sans">ডেলিভারি চার্জ:</span>
                    <span className="text-amber-300">৳{DELIVERY_CHARGE_OUTSIDE_DHAKA}</span>
                    <span className="text-xs font-normal text-slate-400 font-sans">টাকা</span>
                  </div>
                </div>

              </div>

              {/* Special Free Delivery & Gift Offer Card */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border-2 border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.2)] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6 text-amber-300 animate-bounce" />
                </div>
                <div>
                  <div className="text-xs font-black text-amber-300 uppercase tracking-wider mb-0.5">
                    বিশেষ গিফট ও ফ্রি ডেলিভারি অফার
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                    ৩০ মিলি এর উপরে একাধিক পারফিউম অর্ডার করে ডেলিভারি চার্জ ফ্রি এবং সারপ্রাইজ গিফট উপভোগ করুন ।
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Trust Points & Instant Checker */}
            <div className="lg:col-span-5 bg-black/40 rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  বাদশাহ পারফিউমের বিশেষ সেবা গ্যারান্টি
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>১০০% অরিজিনাল কাঁচের বোতল:</strong> প্রিমিয়াম লিক-প্রুফ ড্রপ ও স্প্রে ফ্লাকন।</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>ডেলিভারি নীতিমালা:</strong> কোনো প্রকার ক্ষতিপূরণ দেওয়া হবে না, পার্সেল রিসিভ করার সময় ডেলিভারিম্যানের সামনে চেক করে বুঝে নিন।</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>প্যাকেজিং কোয়ালিটি:</strong> প্রিমিয়াম কুশন বাবল র‍্যাপ ও সিল করা বক্স।</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>স্পেশাল উপহার:</strong> আমাদের নিয়মিত গ্রাহকদের জন্য রয়েছে আকর্ষণীয় পুরস্কার ও স্পেশাল ডিসকাউন্ট ।</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <span className="text-xs text-slate-400">
                  সরাসরি কোনো প্রশ্ন থাকলে আমাদের WhatsApp নাম্বারে যোগাযোগ করতে পারেন: <strong className="text-emerald-400">+8801603724942</strong>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
