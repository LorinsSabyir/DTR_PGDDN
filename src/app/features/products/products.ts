import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { FormsModule } from '@angular/forms';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-products',
  imports: [FormsModule, Button],
  templateUrl: './products.html',
  styleUrl: './products.css',
})

export class Products implements OnInit{

  productService = inject(ProductsService);

  product = this.productService.product;

  productData: any = {};
  editProduct: any = {};

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts();
  }

  addProduct() {
    this.productService.addProduct(this.productData);
    this.productData = {};
  
    console.log('Product added and form cleared!');
  }

  updateProduct(id: number) {
    this.productService.updateProduct(id, this.editProduct);
    this.editProduct = {};

    console.log('Product updated and form cleared!');
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  isModalOpen = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

}
