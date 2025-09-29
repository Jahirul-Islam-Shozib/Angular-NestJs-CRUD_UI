import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {CreateProduct} from '../create-product';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    InputText,
    ButtonDirective
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  products: any[] = [];
  productId: string | null = null;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      discountedPrice: ['', Validators.required],
      originalPrice: ['', Validators.required],
      weight: ['', Validators.required],
      imageUrl: [''],
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (product: any) => {
          this.productForm.patchValue(product);
        },
        error: (err) => console.error('Error fetching product:', err)
      });
    }
  }

  onAddProduct() {
    if (this.productForm.invalid) return;
    const newProduct: CreateProduct = this.productForm.value

    if (this.productId) {
      this.productService.updateProduct(this.productId, newProduct).subscribe({
        next: (res) => {
          console.log('Product updated:', res);
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this.productService.createProduct(newProduct).subscribe({
        next: (res: any) => {
          this.products = [res, ...this.products];
          this.productForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error creating product:', err)
      });
    }
  }
}
