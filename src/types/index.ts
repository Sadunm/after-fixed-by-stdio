export interface PerfumeSize {
  size: string; // e.g. "30 ml", "50 ml", "100 ml"
  price: number; // e.g. 1202, 1700, 2890
}

export interface Perfume {
  id: string;
  name: string;
  image: string;
  sizes: PerfumeSize[];
  longevity: string; // "Ultra Long Lasting Up To 8-9 Hours"
  oilPurity: string; // "Concentration of Oil - 55%"
  tagline?: string;
  description?: string;
  notes?: string[];
}

export interface WholesaleItem {
  id: string;
  name: string;
  subtitle?: string;
  pricePerMl: number; // e.g. 16.00
  minVolumeMl: number; // default 50
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  perfume: string;
  comment: string;
  date: string;
}

export interface CartItem {
  id: string;
  perfumeId: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  isWholesale?: boolean;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  address: string;
  deliveryArea: 'dhaka_inside' | 'dhaka_outside';
  notes?: string;
}
