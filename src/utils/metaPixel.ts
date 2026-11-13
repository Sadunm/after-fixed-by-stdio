/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FB_PIXEL_ID } from '../data/defaultPerfumes';
import { Perfume, CartItem } from '../types';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Checks if Meta Pixel is enabled with a valid ID
 */
export const isMetaPixelEnabled = (): boolean => {
  return typeof FB_PIXEL_ID === 'string' && FB_PIXEL_ID.trim().length > 0;
};

/**
 * Initializes Meta Pixel script in document head
 * If FB_PIXEL_ID is empty or undefined, this is a clean no-op with zero errors.
 */
export const initMetaPixel = (): void => {
  if (typeof window === 'undefined') return;

  if (!isMetaPixelEnabled()) {
    // Graceful no-op when no Pixel ID is configured
    return;
  }

  const pixelId = FB_PIXEL_ID.trim();

  // If already initialized
  if (window.fbq && typeof window.fbq === 'function') {
    return;
  }

  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      document.head.appendChild(t);
    }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  const fbq = (window as any).fbq;
  if (typeof fbq === 'function') {
    fbq('init', pixelId);
    fbq('track', 'PageView');
    console.info(`[Meta Pixel] Initialized successfully with ID: ${pixelId}`);
  }
};

/**
 * Standard PageView event
 */
export const trackPageView = (): void => {
  if (!isMetaPixelEnabled() || typeof window === 'undefined' || !window.fbq) return;
  try {
    window.fbq('track', 'PageView');
  } catch (err) {
    console.warn('[Meta Pixel] Error tracking PageView:', err);
  }
};

/**
 * Standard ViewContent event: Triggered when viewing a perfume's detailed modal
 */
export const trackViewContent = (
  perfume: Perfume | null,
  selectedSize?: string,
  price?: number
): void => {
  if (!isMetaPixelEnabled() || typeof window === 'undefined' || !window.fbq || !perfume) return;
  try {
    const itemPrice = price || perfume.sizes?.[0]?.price || 0;
    window.fbq('track', 'ViewContent', {
      content_name: perfume.name,
      content_category: 'Perfume',
      content_ids: [perfume.id],
      content_type: 'product',
      value: itemPrice,
      currency: 'BDT',
      selected_size: selectedSize || perfume.sizes?.[0]?.size || 'N/A'
    });
  } catch (err) {
    console.warn('[Meta Pixel] Error tracking ViewContent:', err);
  }
};

/**
 * Standard AddToCart event: Triggered when a perfume is added to the cart
 */
export const trackAddToCart = (item: {
  perfumeId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}): void => {
  if (!isMetaPixelEnabled() || typeof window === 'undefined' || !window.fbq) return;
  try {
    window.fbq('track', 'AddToCart', {
      content_name: `${item.name} (${item.size})`,
      content_ids: [item.perfumeId],
      content_type: 'product',
      value: item.price * item.quantity,
      currency: 'BDT',
      quantity: item.quantity,
      size: item.size
    });
  } catch (err) {
    console.warn('[Meta Pixel] Error tracking AddToCart:', err);
  }
};

/**
 * Standard InitiateCheckout event: Triggered when user opens checkout drawer / modal
 */
export const trackInitiateCheckout = (cart: CartItem[], totalAmount: number): void => {
  if (!isMetaPixelEnabled() || typeof window === 'undefined' || !window.fbq || cart.length === 0) return;
  try {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: cart.map((i) => i.perfumeId),
      content_type: 'product',
      num_items: cart.reduce((sum, item) => sum + item.quantity, 0),
      value: totalAmount,
      currency: 'BDT'
    });
  } catch (err) {
    console.warn('[Meta Pixel] Error tracking InitiateCheckout:', err);
  }
};

/**
 * Standard Purchase event: Triggered when user completes checkout submission / WhatsApp confirmation
 */
export const trackPurchase = (
  orderId: string,
  cart: CartItem[],
  grandTotal: number
): void => {
  if (!isMetaPixelEnabled() || typeof window === 'undefined' || !window.fbq || cart.length === 0) return;
  try {
    window.fbq('track', 'Purchase', {
      content_ids: cart.map((i) => i.perfumeId),
      content_type: 'product',
      num_items: cart.reduce((sum, item) => sum + item.quantity, 0),
      value: grandTotal,
      currency: 'BDT',
      order_id: orderId
    });
  } catch (err) {
    console.warn('[Meta Pixel] Error tracking Purchase:', err);
  }
};

/**
 * Custom event helper for future tracking flexibility
 */
export const trackCustomEvent = (eventName: string, params?: Record<string, any>): void => {
  if (!isMetaPixelEnabled() || typeof window === 'undefined' || !window.fbq) return;
  try {
    window.fbq('trackCustom', eventName, params);
  } catch (err) {
    console.warn(`[Meta Pixel] Error tracking custom event ${eventName}:`, err);
  }
};
