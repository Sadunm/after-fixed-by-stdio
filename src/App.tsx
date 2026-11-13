/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FAQSection } from './components/FAQSection';
import { DeliverySection } from './components/DeliverySection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { RequestPerfumeModal } from './components/RequestPerfumeModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { WholesaleModal } from './components/WholesaleModal';
import { ReviewsModal } from './components/ReviewsModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Perfume, CartItem } from './types';
import perfumesData from './data/perfumes.json';
import { initMetaPixel, trackAddToCart, trackInitiateCheckout } from './utils/metaPixel';
import { getPerfumeImageUrl, resolvePerfumesWithAssets } from './utils/imageResolver';

export default function App() {
  // Perfumes are loaded directly from src/data/perfumes.json with images resolved dynamically for Vite production builds
  const perfumes: Perfume[] = resolvePerfumesWithAssets(perfumesData as Perfume[]);

  // Cart state persisted in localStorage for user convenience (with asset image URL resolver)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('bp_cart');
      if (savedCart) {
        const parsed: CartItem[] = JSON.parse(savedCart);
        return parsed.map((item) => ({
          ...item,
          image: getPerfumeImageUrl(item.image)
        }));
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
    return [];
  });

  // Modal states
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPrefill, setRequestPrefill] = useState('');
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isWholesaleOpen, setIsWholesaleOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // Initialize Meta Pixel tracking on app launch (runs only if FB_PIXEL_ID is set)
  useEffect(() => {
    initMetaPixel();
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bp_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Open checkout and track InitiateCheckout
  const handleOpenCheckout = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    trackInitiateCheckout(cart, subtotal);
    setIsCheckoutOpen(true);
  };

  // Cart operations with Meta Pixel AddToCart tracking
  const handleAddToCart = (perfume: Perfume, size: string, price: number, quantity: number) => {
    trackAddToCart({
      perfumeId: perfume.id,
      name: perfume.name,
      size,
      price,
      quantity
    });

    setCart((prev) => {
      const cartItemId = `${perfume.id}-${size}`;
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            perfumeId: perfume.id,
            name: perfume.name,
            image: getPerfumeImageUrl(perfume.image),
            size,
            price,
            quantity
          }
        ];
      }
    });
  };

  const handleAddWholesaleItem = (cartItem: CartItem) => {
    trackAddToCart({
      perfumeId: cartItem.perfumeId,
      name: cartItem.name,
      size: cartItem.size,
      price: cartItem.price,
      quantity: 1
    });

    const resolvedCartItem = {
      ...cartItem,
      image: getPerfumeImageUrl(cartItem.image)
    };

    setCart((prev) => {
      const existing = prev.find((item) => item.id === resolvedCartItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === resolvedCartItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, resolvedCartItem];
      }
    });
  };

  // Direct order via WhatsApp
  const handleDirectOrder = (perfume: Perfume, size: string, price: number, quantity: number) => {
    handleAddToCart(perfume, size, price, quantity);
    setSelectedPerfume(null);
    trackInitiateCheckout(
      [
        {
          id: `${perfume.id}-${size}`,
          perfumeId: perfume.id,
          name: perfume.name,
          image: perfume.image,
          size,
          price,
          quantity
        }
      ],
      price * quantity
    );
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Smooth scroll helpers
  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStandard = () => {
    const el = document.getElementById('standard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFAQ = () => {
    const el = document.getElementById('faq');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDelivery = () => {
    const el = document.getElementById('delivery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080b0e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={handleOpenCheckout}
        onOpenDeliveryInfo={scrollToDelivery}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenWholesale={() => setIsWholesaleOpen(true)}
        onScrollToCollection={scrollToCollection}
        onScrollToStandard={scrollToStandard}
        onScrollToFAQ={scrollToFAQ}
      />

      <main className="flex-1">
        {/* Hero Section matching Screenshot 1 */}
        <Hero
          onScrollToCollection={scrollToCollection}
          onOpenWholesale={() => setIsWholesaleOpen(true)}
          onOpenReviews={() => setIsReviewsOpen(true)}
        />

        {/* Collection Section with Search & Animated Request Modal Trigger */}
        <Collection
          perfumes={perfumes}
          onOpenDetails={(perfume) => setSelectedPerfume(perfume)}
          onOpenRequestModal={(query) => {
            setRequestPrefill(query || '');
            setIsRequestModalOpen(true);
          }}
        />

        {/* Why Choose Us Section matching Screenshot 3 */}
        <WhyChooseUs />

        {/* FAQ Accordion Section for Trust and High Conversion */}
        <FAQSection />

        {/* Delivery & COD Section */}
        <DeliverySection />
      </main>

      {/* Footer */}
      <Footer
        onScrollToCollection={scrollToCollection}
        onOpenDeliveryInfo={scrollToDelivery}
        onOpenWholesale={() => setIsWholesaleOpen(true)}
        onScrollToFAQ={scrollToFAQ}
      />

      {/* Floating Call & WhatsApp Action Buttons */}
      <FloatingWhatsApp />

      {/* Modals */}
      {/* 1. Product Detail Modal with GARAUNTEED LONG LASTING */}
      <ProductDetailModal
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
        onAddToCart={handleAddToCart}
        onDirectOrder={handleDirectOrder}
      />

      {/* 2. Cart & Direct Cash on Delivery Checkout Modal with 11-digit Phone Validation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 3. Request Perfume Modal */}
      <RequestPerfumeModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        prefillName={requestPrefill}
      />

      {/* 4. Wholesale Modal with Mobile Compact Card-View and Desktop Table */}
      <WholesaleModal
        isOpen={isWholesaleOpen}
        onClose={() => setIsWholesaleOpen(false)}
        onAddToCart={handleAddWholesaleItem}
      />

      {/* 5. Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      {/* 6. Customer Reviews Modal */}
      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

    </div>
  );
}
