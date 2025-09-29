import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../products';
import {CurrencyPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-all-products',
  imports: [
    CurrencyPipe,
    TableModule,
    Button,
    RouterLink,
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService,
              private router: Router,) {
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: error => console.log(error),
    })
    console.log(this.products)

  }

  updateProduct(product: Product) {
    this.router.navigate(['edit-product', product._id]);
  }

  removeProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: data => {
        this.products = this.products.filter(product => product._id !== id);
      },
      error: error => console.log(error),
    });
  }
}
