import { Component, OnInit } from '@angular/core';
import { InputCreateProduct, Product } from '@/types';
import { StoreService } from '@/services/store.service';
import { ProductsService } from '@/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  productDetail: Product | null = null;
  detailVisible = false;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  movieTitles = [
    'Harry Potter and the Sorcerer’s Stone',
    'Harry Potter and the Chamber of Secrets',
    'Harry Potter and the Prisoner of Azkaban',
    'Harry Potter and the Goblet of Fire',
    'Harry Potter and the Order of the Phoenix',
    'Harry Potter and the Half-Blood Prince',
    'Harry Potter and the Deathly Hallows',
  ];

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(limit = 10, offset = 0) {
    this.productService
      .getProductByPage({
        limit,
        offset: offset * 10,
      })
      .subscribe((data) => {
        this.products = data;
      });
  }

  getSingleProduct() {
    this.statusDetail = 'loading';
    const id = '1000';
    this.productService.getProductById(id).subscribe(
      (res) => {
        console.log('el detaille es', res);
        this.statusDetail = 'success';
        this.handleOpenProductDetail(res);
      },
      (error) => {
        this.statusDetail = 'error';
        Swal.fire({
          title: error,
          icon: 'error',
        });
        console.error(error);
      }
    );
  }

  handleChangePage(page: number) {
    this.loadProducts(10, page);
  }

  getRandomIndex() {
    return Math.floor(Math.random() * this.movieTitles.length);
  }

  deleteProduct(id: number) {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return;
    this.products.splice(idx, 1);
  }

  updateProduct({ id, fields }: { id: number; fields: Partial<Product> }) {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return;
    this.products[idx] = {
      ...this.products[idx],
      ...fields,
    };
  }

  onProductSelected(product: Product) {
    this.storeService.addProduct(product);
  }

  handleOpenProductDetail(product: Product) {
    this.productDetail = product;
    this.detailVisible = true;
  }

  handleCloseDetail() {
    this.detailVisible = false;
  }

  handleCreateNewProduct() {
    const hardProduct: InputCreateProduct = {
      title: 'Harry potter and the chamber of secrets',
      description: 'El mejor libro de la saga',
      categoryId: 2,
      images: [
        'https://images.pexels.com/photos/7978810/pexels-photo-7978810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      price: 120,
    };
    this.productService.createProduct(hardProduct).subscribe((response) => {
      this.products.unshift(response);
    });
  }

  handleDeleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((response) => {
      console.log(
        '🚀 ~ file: products-list.component.ts:72 ~ ProductsListComponent ~ this.productService.deleteProduct ~ response:',
        response
      );
      this.deleteProduct(id);
    });
  }

  handleEditProduct(id: number) {
    const image =
      'https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const randomIndex = this.getRandomIndex();
    this.productService
      .updateProduct({
        id,
        input: {
          images: [image],
          title: this.movieTitles[randomIndex],
        },
      })
      .subscribe((response) => {
        this.updateProduct({
          id,
          fields: {
            images: response.images,
            title: response.title,
          },
        });
      });
  }
}
