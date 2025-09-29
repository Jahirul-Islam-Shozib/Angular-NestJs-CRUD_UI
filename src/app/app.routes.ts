import { Routes } from '@angular/router';
import {AllProductsComponent} from './all-products/all-products/all-products.component';
import {AddProductComponent} from './all-products/add-product/add-product.component';

export const routes: Routes = [
  {
    path: '',
    component: AllProductsComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
  {
    path: 'edit-product/:id',
    component: AddProductComponent,
  }
];
