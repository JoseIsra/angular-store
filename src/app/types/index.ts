export type InputCreateProduct = Omit<Product, 'id' | 'category'> & {
  categoryId: number;
};

export type Category = {
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

export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  role: 'customer' | 'admin';
};

export type InputCreateUser = Omit<User, 'id'>;

export type AuthResponse = {
  access_token: string;
};

export type UploadFileResponse = {
  originalname: string;
  filename: string;
  location: string;
};
