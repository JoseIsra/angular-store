export type InputCreateProduct = Omit<Product, 'id' | 'category'> & {
  categoryId: number;
};

type Category = {
  id: number;
  name: string;
  typeImg: string;
};

export type Product = {
  id: number;
  description: string;
  price: number;
  images: string[];
  title: string;
  category: Category;
  taxes?: number;
};
