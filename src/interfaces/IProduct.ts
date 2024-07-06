export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  tags: string[];
  brand: string;
  reviews: any[];
  meta: any;
  images: string[]; 
  thumbnail: string;
}
