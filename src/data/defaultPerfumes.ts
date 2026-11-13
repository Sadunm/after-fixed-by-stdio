import { Perfume } from '../types';
import perfumesData from './perfumes.json';
import { resolvePerfumesWithAssets } from '../utils/imageResolver';

export const DEFAULT_PERFUMES: Perfume[] = resolvePerfumesWithAssets(perfumesData as Perfume[]);

export const WHATSAPP_NUMBER = '8801603724942';
export const FACEBOOK_URL = 'https://www.facebook.com/share/19rAdk5KkU/';
export const MESSENGER_URL = 'https://www.facebook.com/share/19rAdk5KkU/';
export const DELIVERY_CHARGE_INSIDE_DHAKA = 80;
export const DELIVERY_CHARGE_OUTSIDE_DHAKA = 140;

// ==============================================================
// 📌 Meta Pixel (Facebook Pixel) Configuration
// পরবর্তীতে শুধু এখানে আপনার Pixel ID (যেমন: '123456789012345') বসিয়ে সেভ করলেই
// সাথে সাথে পুরো ওয়েবসাইটে স্বয়ংক্রিয়ভাবে রিয়েল-টাইম Facebook ইভেন্ট ট্র্যাকিং চালু হয়ে যাবে।
// ফাঁকা রাখলে (FB_PIXEL_ID = '') কোনো ট্র্যাকিং ফায়ার হবে না এবং কোডে কোনো এরর মারবে না।
// ==============================================================
export const FB_PIXEL_ID = '';
