export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  urlImage: string;
  quantity?: number;
}