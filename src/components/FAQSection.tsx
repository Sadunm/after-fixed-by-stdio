import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { NeonHeadline } from './NeonHeadline';
import faqsData from '../data/faqs.json';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const faqs: FAQItem[] = faqsData;

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-[#070a0e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-emerald-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
          </div>

          <div className="flex justify-center mb-3">
            <NeonHeadline text="সাধারণ জিজ্ঞাসা ও উত্তর" size="xl" as="h2" />
          </div>

          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-medium">
            অর্ডার করার আগে আপনার মনের যেকোনো প্রশ্ন বা দ্বিধা নিরসনে আমাদের স্পষ্ট প্রতিশ্রুতি ও পলিসি জেনে নিন।
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#0d1218] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white font-heading tracking-wide flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_#34d399]" />
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-emerald-950 border-emerald-500/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed font-sans border-t border-white/5 animate-fadeIn">
                    <p className="pl-4 border-l-2 border-emerald-500/60 text-slate-300/90">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-10 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-black to-slate-900 border border-emerald-500/30 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            অন্য কোনো প্রশ্ন থাকলে সরাসরি আমাদের ফোন নাম্বারে যোগাযোগ করতে পারেন: <strong className="text-emerald-400 font-mono">০১৬০৩৭২৪৯৪২</strong>
          </span>
        </div>

      </div>
    </section>
  );
};
