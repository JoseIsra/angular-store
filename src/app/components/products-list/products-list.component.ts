import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputCreateProduct, Product, UploadFileResponse, User } from '@/types';
import { StoreService } from '@/services/store.service';
import { ProductsService } from '@/services/products.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { UsersService } from '@/services/users/users.service';
import { AuthService } from '@/services/auth/auth.service';
import { TokenService } from '@/services/auth/token.service';
import { FilesService } from '@/services/files/files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  @Output() pageChanged = new EventEmitter<number>();

  usersList: User[] = [];
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

  userInputs = {
    name: '',
    email: '',
    password: '',
  };

  loginFormVisible = false;
  userProfile: User | null = null;
  fileSelected: File | null = null;
  fileUploaded = false;
  fileData: UploadFileResponse | null = null;
  currentPage = 1;

  constructor(
    private storeService: StoreService,
    private productService: ProductsService,
    private userService: UsersService,
    private authService: AuthService,
    public tokenService: TokenService,
    private fileService: FilesService,
    private routerService: Router
  ) {}

  getSingleProduct() {
    this.statusDetail = 'loading';
    const id = '12';
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        console.log('el detaille es', res);
        this.statusDetail = 'success';
        this.handleOpenProductDetail(res);
      },
      error: (error) => {
        this.statusDetail = 'error';
        Swal.fire({
          title: error,
          icon: 'error',
        });
        console.error(error);
      },
    });
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  readAndUpdate(id: string) {
    this.productService
      .getProductById(id)
      .pipe(
        // LA RESPUESTA DE UN OBSERVABLE INGRESA EN EL OTRO OBSERVABLE CON SWITHMAP
        switchMap((product) =>
          this.productService.updateProduct({
            id: product.id,
            input: {
              title: 'something',
            },
          })
        )
      )
      .subscribe((data) => {
        //esta es la manera cuando se considera como una dependencia
        // de subscribe
        console.log('data fetch y actualizada', data);
      });

    zip(
      this.productService.getProductById(id),
      this.productService.updateProduct({
        id: Number(id),
        input: { title: 'Onomatopeya' },
      })
    ).subscribe((response) => {
      // este zip es el Promise.all([]) de los observables
      // response debe ser una respuesta en forma de arreglo
      // en el orden de las petiticiones realizadas
      console.log('rsponse', response);
    });
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
    this.routerService.navigate([`/product/${product.id}`]);
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

  handleSubmitForm() {
    this.userService
      .createUser({
        email: this.userInputs.email,
        name: this.userInputs.name,
        password: this.userInputs.password,
      })
      .subscribe(() => {
        this.userInputs.email = '';
        this.userInputs.password = '';
        this.userInputs.name = '';
        Swal.fire({
          title: 'Nuevo usuario creado',
          icon: 'success',
        });
      });
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((data) => {
      console.log('users fetch', data);
      this.usersList = data;
    });
  }

  toggleLoginForm() {
    this.loginFormVisible = !this.loginFormVisible;
  }

  handleUserLogin() {
    this.authService
      .login({
        email: this.userInputs.email,
        password: this.userInputs.password,
      })
      .subscribe(() => {
        Swal.fire({
          title: 'Login exitoso 😀',
          icon: 'success',
        });
      });
  }

  handleGetProfile() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Perfil recuperado 😀',
          icon: 'success',
        });
        this.userProfile = res;
      },
      error: () => {
        Swal.fire({
          title: 'No se pudo recuperar perfil',
          icon: 'error',
        });
      },
    });
  }

  handleLogOut() {
    this.userProfile = null;
    this.tokenService.removeToken();
  }

  downloadPdf() {
    this.fileService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe(() => {
        Swal.fire({
          title: 'PDF descargado',
          icon: 'success',
        });
      });
  }

  handleUploadFile() {
    this.fileUploaded = false;
    console.log('fiel to upload?=', this.fileSelected);
    const form = new FormData();
    form.append('file', this.fileSelected as File);
    this.fileService.uploadFile(form).subscribe({
      next: (response) => {
        this.fileData = response;
        this.fileUploaded = true;
        Swal.fire({
          title: 'File uploaded!',
          icon: 'success',
        });
      },
      error: () => {
        this.fileUploaded = false;
        Swal.fire({
          title: 'No se subió el archivo',
          icon: 'error',
        });
      },
    });
  }

  handleFileChanged(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.[0];
    if (file) {
      this.fileUploaded = false;
      this.fileSelected = file;
    }
  }
}
