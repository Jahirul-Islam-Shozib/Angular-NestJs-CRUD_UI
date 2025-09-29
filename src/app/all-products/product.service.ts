import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './products';
import {CreateProduct} from './create-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProducts() {
    return this.http.get<Product[]>('http://localhost:3000/all-products');
  }

  createProduct(product: CreateProduct) {
    return this.http.post('http://localhost:3000/all-products', product);
  }

  getProductById(id: string) {
    return this.http.get(`http://localhost:3000/all-products/${id}`);
  }

  updateProduct(id: string, product: CreateProduct) {
    return this.http.put(`http://localhost:3000/all-products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/all-products/${id}`);
  }
}
