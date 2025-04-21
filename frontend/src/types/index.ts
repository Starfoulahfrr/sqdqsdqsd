export interface Category {
  id: string;
  name: string;
  products: Product[];
  order: number;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  media: MediaItem[];
  order: number;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  fileId: string;
  orderIndex: number;
}

export interface CustomButton {
  id: string;
  name: string;
  type: 'url' | 'text';
  value: string;
}

export interface BotConfig {
  welcomeMessage: string;
  bannerImage?: string;
  orderButton: {
    type: 'url' | 'telegram' | 'text';
    value: string;
  };
  customButtons: CustomButton[];
}