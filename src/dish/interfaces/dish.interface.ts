// interfaces/dish.interface.ts
export interface IDish {
  name: string;
  description: string;
  price: number;
  category: string;
  file?: string | null; // Make image optional and nullable
}
