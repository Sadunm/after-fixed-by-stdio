import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle, 
  ShieldCheck, 
  Send,
  ShoppingBag,
  AlertCircle,
  ExternalLink,
  Gift,
  Sparkles,
  MessageCircle,
  Copy
} from 'lucide-react';
import { CartItem } from '../types';
import { 
  WHATSAPP_NUMBER, 
  FACEBOOK_URL,
  MESSENGER_URL,
  DELIVERY_CHARGE_INSIDE_DHAKA, 
  DELIVERY_CHARGE_OUTSIDE_DHAKA 
} from '../data/defaultPerfumes';
import { trackPurchase } from '../utils/metaPixel';
import { getPerfumeImageUrl } from '../utils/imageResolver';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'inside' | 'outside'>('inside');
  const [orderNotes, setOrderNotes] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderChannel, setOrderChannel] = useState<'whatsapp' | 'messenger'>('whatsapp');
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string>('');
  const [lastMessengerUrl, setLastMessengerUrl] = useState<string>('');
  const [lastOrderMessage, setLastOrderMessage] = useState<string>('');
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Offer: Multiple perfumes with size >= 30ml get Free Delivery + Surprise Gift
  const is30mlOrAbove = (sizeStr: string) => {
    const num = parseInt(sizeStr.replace(/\D/g, ''), 10) || 0;
    return num >= 30;
  };

  const eligible30mlPlusCount = cart
    .filter((item) => is30mlOrAbove(item.size))
    .reduce((sum, item) => sum + item.quantity, 0);

  const isFreeDeliveryEligible = eligible30mlPlusCount >= 2;
  const standardDeliveryCharge = deliveryArea === 'inside' ? DELIVERY_CHARGE_INSIDE_DHAKA : DELIVERY_CHARGE_OUTSIDE_DHAKA;
  const deliveryCharge = isFreeDeliveryEligible ? 0 : standardDeliveryCharge;
  const grandTotal = subtotal + (cart.length > 0 ? deliveryCharge : 0);

  // Validate 11-digit Bangladeshi mobile number
  const validatePhone = (phone: string): { isValid: boolean; normalized: string } => {
    const digitsOnly = phone.replace(/\D/g, '');
    let normalized = digitsOnly;
    if (digitsOnly.length === 13 && digitsOnly.startsWith('8801')) {
      normalized = digitsOnly.slice(2);
    }
    const isValid = /^01[3-9]\d{8}$/.test(normalized);
    return { isValid, normalized };
  };

  const handlePhoneChange = (val: string) => {
    setCustomerPhone(val);
    if (phoneError) {
      const { isValid } = validatePhone(val);
      if (isValid) setPhoneError(null);
    }
  };

  const handleProcessOrder = (channel: 'whatsapp' | 'messenger') => {
    setPhoneError(null);

    if (!customerName.trim()) {
      alert('অনুগ্রহ করে আপনার নাম লিখুন।');
      return;
    }

    const { isValid, normalized } = validatePhone(customerPhone);
    if (!isValid) {
      setPhoneError('অনুগ্রহ করে ১১ ডিজিটের সঠিক মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX বা 018XXXXXXXX)');
      return;
    }

    if (!customerAddress.trim()) {
      alert('অনুগ্রহ করে সম্পূর্ণ ডেলিভারি ঠিকানা দিন।');
      return;
    }

    if (cart.length === 0) {
      alert('আপনার কার্ট খালি। অনুগ্রহ করে পারফিউম নির্বাচন করুন।');
      return;
    }

    const orderId = 'BP-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const itemsText = cart.map(item => 
      `• *${item.name}* (${item.size}) × ${item.quantity} = ৳${(item.price * item.quantity).toLocaleString('bn-BD')}`
    ).join('\n');

    const areaText = deliveryArea === 'inside' 
      ? `ঢাকার ভিতরে (ডেলিভারি চার্জ: ৳${DELIVERY_CHARGE_INSIDE_DHAKA})` 
      : `ঢাকার বাহিরে (ডেলিভারি চার্জ: ৳${DELIVERY_CHARGE_OUTSIDE_DHAKA})`;

    const deliverySummaryText = isFreeDeliveryEligible
      ? '• ডেলিভারি চার্জ: ৳০ (ফ্রি ডেলিভারি অফার প্রযোজ্য)\n• 🎁 সারপ্রাইজ গিফট: বিশেষ গিফট অন্তর্ভুক্ত'
      : `• ডেলিভারি চার্জ: ৳${deliveryCharge.toLocaleString('bn-BD')}`;

    const channelName = channel === 'messenger' ? 'Facebook Messenger' : 'WhatsApp';

    const message = `🛍️ *নতুন পারফিউম অর্ডার - বাদশাহ প্রিমিয়াম পারফিউম* 🛍️
━━━━━━━━━━━━━━━━━━
🆔 *অর্ডার আইডি:* #${orderId}
📅 *তারিখ:* ${dateStr}
📱 *অর্ডার মাধ্যম:* ${channelName}

👤 *কাস্টমারের তথ্য:*
• *নাম:* ${customerName.trim()}
• *মোবাইল:* ${normalized}
• *ঠিকানা:* ${customerAddress.trim()}
• *এলাকা:* ${areaText}

━━━━━━━━━━━━━━━━━━
📦 *অর্ডারকৃত পারফিউম তালিকা:*
${itemsText}

━━━━━━━━━━━━━━━━━━
💰 *হিসাব বিবরনী:*
• পারফিউম মূল্য: ৳${subtotal.toLocaleString('bn-BD')}
${deliverySummaryText}
• *সর্বমোট প্রদেয়:* ৳${grandTotal.toLocaleString('bn-BD')}
• *পেমেন্ট পদ্ধতি:* ক্যাশ অন ডেলিভারি (সারাদেশে COD)
${orderNotes.trim() ? `• *নোট:* ${orderNotes.trim()}` : ''}
━━━━━━━━━━━━━━━━━━
অনুগ্রহ করে আমার অর্ডারটি কনফার্ম করুন। ধন্যবাদ!`;

    // Save order to local storage for tracking
    try {
      const existing = JSON.parse(localStorage.getItem('bp_recent_orders') || '[]');
      existing.unshift({
        id: orderId,
        date: new Date().toISOString(),
        items: cart,
        total: grandTotal,
        customerName: customerName.trim(),
        phone: normalized,
        address: customerAddress.trim(),
        deliveryArea,
        channel
      });
      localStorage.setItem('bp_recent_orders', JSON.stringify(existing.slice(0, 10)));
    } catch (e) {
      // ignore
    }

    // Trigger Meta Pixel Purchase Event
    trackPurchase(orderId, cart, grandTotal);

    setOrderChannel(channel);
    setLastOrderMessage(message);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (channel === 'whatsapp') {
      const encoded = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
      setLastWhatsAppUrl(whatsappUrl);

      // Direct routing for mobile vs desktop to bypass popup blockers
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      // Messenger routing
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(message);
          setCopiedMessage(true);
        }
      } catch (err) {
        // ignore
      }

      const messengerUrl = MESSENGER_URL || FACEBOOK_URL;
      setLastMessengerUrl(messengerUrl);

      if (isMobile) {
        window.location.href = messengerUrl;
      } else {
        window.open(messengerUrl, '_blank', 'noopener,noreferrer');
      }
    }

    setIsOrdered(true);
  };

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessOrder('whatsapp');
  };

  const handleFinish = () => {
    onClearCart();
    setIsOrdered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#0d1218] border border-amber-500/40 rounded-2xl shadow-2xl my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090d13]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-heading">
              আপনার শপিং কার্ট ও ক্যাশ অন ডেলিভারি অর্ডার
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isOrdered ? (
            <div className="text-center py-8 px-4">
              {orderChannel === 'messenger' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <MessageCircle className="w-9 h-9 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 font-heading">
                    অর্ডার সম্পন্ন! Messenger ওপেন হচ্ছে...
                  </h4>
                  <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl bg-blue-950/50 border border-blue-500/40 text-xs sm:text-sm text-blue-200 text-left sm:text-center shadow-lg">
                    <div className="font-bold flex items-center justify-center gap-2 text-white mb-1.5">
                      <Copy className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>অর্ডারের সমস্ত বিবরণ ক্লিপবোর্ডে কপি করা হয়েছে!</span>
                    </div>
                    মেসেঞ্জার চ্যাটবক্স ওপেন হলে শুধুমাত্র <strong>Paste</strong> করে মেসেজটি পাঠিয়ে দিন।
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={lastMessengerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>সরাসরি Messenger-এ যান</span>
                    </a>

                    <button
                      onClick={() => {
                        try {
                          if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(lastOrderMessage);
                            setCopiedMessage(true);
                            setTimeout(() => setCopiedMessage(false), 2000);
                          }
                        } catch (e) {
                          // ignore
                        }
                      }}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copiedMessage ? 'কপি হয়েছে!' : 'মেসেজ পুনরায় কপি করুন'}</span>
                    </button>

                    <button
                      onClick={handleFinish}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold cursor-pointer"
                    >
                      সম্পন্ন করুন
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-2xl font-bold text-white mb-2 font-heading">
                    অর্ডার সম্পন্ন! WhatsApp লোড হচ্ছে...
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                    আপনার ডিভাইসে যদি স্বয়ংক্রিয়ভাবে WhatsApp চালু না হয়, তবে নিচের বাটনে ক্লিক করে সরাসরি মেসেজটি পাঠান।
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={lastWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send className="w-4 h-4 fill-slate-950" />
                      <span>সরাসরি WhatsApp-এ যান</span>
                    </a>
                    <button
                      onClick={handleFinish}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold cursor-pointer"
                    >
                      সম্পন্ন করুন
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-1">আপনার কার্ট খালি রয়েছে</h4>
              <p className="text-xs text-slate-400 mb-5">আমাদের কালেকশন থেকে আপনার পছন্দের পারফিউম নির্বাচন করুন</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm cursor-pointer"
              >
                পারফিউম কালেকশন দেখুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>নির্বাচিত পারফিউম ({cart.length})</span>
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-rose-400 hover:text-rose-300 font-normal cursor-pointer"
                  >
                    সব মুছুন
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3"
                    >
                      <img
                        src={getPerfumeImageUrl(item.image)}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded-lg bg-black shrink-0 border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate font-heading">
                          {item.name}
                        </h5>
                        <div className="text-[11px] text-amber-400 font-medium">
                          {item.size} · ৳{item.price.toLocaleString('bn-BD')}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white font-mono px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-amber-300 font-mono">
                          ৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 mt-1 inline-block cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Summary */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>পারফিউম সাবটোটাল:</span>
                    <span className="font-mono font-bold text-white">৳{subtotal.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 items-center">
                    <span>ডেলিভারি চার্জ:</span>
                    {isFreeDeliveryEligible ? (
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <span className="line-through text-slate-500 font-mono">৳{standardDeliveryCharge}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-[10px]">ফ্রি (৳০)</span>
                      </span>
                    ) : (
                      <span className="font-mono font-bold text-emerald-400">৳{deliveryCharge.toLocaleString('bn-BD')}</span>
                    )}
                  </div>
                  {isFreeDeliveryEligible && (
                    <div className="flex justify-between text-amber-300 font-semibold items-center pt-1 border-t border-white/5">
                      <span className="flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-amber-400" />
                        সারপ্রাইজ গিফট:
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-[10px] text-amber-300">
                        অন্তর্ভুক্ত
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-amber-300">
                    <span>সর্বমোট পরিশোধযোগ্য:</span>
                    <span className="font-mono text-base">৳{grandTotal.toLocaleString('bn-BD')}</span>
                  </div>
                </div>

                {/* Offer Notification Banner */}
                {isFreeDeliveryEligible ? (
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/50 text-[11px] text-emerald-300 flex items-start gap-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>অভিনন্দন!</strong> ৩০ মিলি এর উপরে একাধিক পারফিউম থাকায় ডেলিভারি চার্জ সম্পূর্ণ ফ্রি এবং সারপ্রাইজ গিফট যুক্ত হয়েছে!
                    </span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-950/60 to-slate-900/80 border border-amber-500/40 text-[11px] text-amber-200 flex items-start gap-2 shadow-sm">
                    <Gift className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
                    <span>
                      <strong>বিশেষ অফার:</strong> ৩০ মিলি এর উপরে একাধিক পারফিউম অর্ডার করে ডেলিভারি চার্জ ফ্রি এবং সারপ্রাইজ গিফট উপভোগ করুন ।
                    </span>
                  </div>
                )}

                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>সারাদেশে ১০০% ক্যাশ অন ডেলিভারি (কোনো অগ্রিম টাকা লাগবে না)</span>
                </div>
              </div>

              {/* Right Column: Customer Info & WhatsApp Order Action */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSendWhatsAppOrder} className="space-y-3.5">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    ক্যাশ অন ডেলিভারি ফর্ম (সরাসরি WhatsApp)
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      আপনার পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="যেমন: তানভীর আহমেদ"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300">
                        সচল মোবাইল নম্বর (১১ ডিজিট) *
                      </label>
                      <span className="text-[10px] text-emerald-400 font-mono">যেমন: 01712345678</span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      maxLength={14}
                      className={`w-full px-3.5 py-2 rounded-xl bg-[#080b0f] border text-white text-sm focus:outline-none ${
                        phoneError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-emerald-500'
                      }`}
                    />
                    {phoneError && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{phoneError}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ডেলিভারি এলাকা নির্বাচন করুন *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('inside')}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          deliveryArea === 'inside'
                            ? 'border-emerald-400 bg-emerald-950/60 text-white font-bold'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400'
                        }`}
                      >
                        <div className="text-xs">ঢাকার ভিতরে</div>
                        <div className="text-[11px] text-emerald-400 font-mono">চার্জ: ৳{DELIVERY_CHARGE_INSIDE_DHAKA}</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryArea('outside')}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          deliveryArea === 'outside'
                            ? 'border-amber-400 bg-amber-950/60 text-white font-bold'
                            : 'border-slate-800 bg-slate-900/60 text-slate-400'
                        }`}
                      >
                        <div className="text-xs">ঢাকার বাহিরে</div>
                        <div className="text-[11px] text-amber-400 font-mono">চার্জ: ৳{DELIVERY_CHARGE_OUTSIDE_DHAKA}</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/উপজেলা/জেলা) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="যেমন: বাড়ি # ১২, রোড # ৪, সেক্টর # ৭, উত্তরা, ঢাকা"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      বিশেষ নির্দেশনা / ডেলিভারি নোট (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="যেমন: ডেলিভারির পূর্বে ফোন দিন"
                      className="w-full px-3.5 py-1.5 rounded-xl bg-[#080b0f] border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        অর্ডার কনফার্ম করার মাধ্যম বেছে নিন:
                      </span>
                      <span className="text-emerald-400 font-mono text-xs font-black">
                        মোট প্রদেয়: ৳{grandTotal.toLocaleString('bn-BD')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Option 1: Messenger */}
                      <button
                        type="button"
                        onClick={() => handleProcessOrder('messenger')}
                        className="w-full py-3.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.35)] cursor-pointer active:scale-[0.98] transition-all border border-blue-400/50"
                      >
                        <MessageCircle className="w-5 h-5 text-white shrink-0" />
                        <span>১. Messenger-এ অর্ডার</span>
                      </button>

                      {/* Option 2: WhatsApp */}
                      <button
                        type="button"
                        onClick={() => handleProcessOrder('whatsapp')}
                        className="w-full py-3.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer active:scale-[0.98] transition-all border border-emerald-400/50"
                      >
                        <Send className="w-5 h-5 fill-slate-950 shrink-0" />
                        <span>২. WhatsApp-এ অর্ডার</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center font-medium">
                      * আপনার সুবিধামত যেকোনো একটি অপশনে ক্লিক করে সরাসরি অর্ডারটি কনফার্ম করুন।
                    </p>
                  </div>
                </form>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
