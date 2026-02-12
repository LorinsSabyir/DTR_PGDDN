import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  constructor(private http: HttpClient) {}

  product = signal<any>({
    data: [],
    isLoading: false,
  });

  getProducts() {
    this.product.update((prev: any) => ({
      ...prev,
      isLoading: true,
    }));
    this.http.get('https://dummyjson.com/products').subscribe({
      next: (response: any) => {
        this.product.update((prev: any) => ({
          ...prev,
          data: response.products,
        }));
      },
      error: (error) => {
        console.error('Error fetching product:', error);
      },
      complete: () => {
        this.product.update((prev: any) => ({
          ...prev,
          isLoading: false,
        }));
      },
    });
  }

  addProduct(product: any) {
    this.http.post('https://dummyjson.com/products/add', product).subscribe({
      next: (response) => {
        console.log('Recipe added successfully:', response);
        this.getProducts();
      },
      error: (error) => {
        console.error('Error adding recipe:', error);
      },
    });
  }

  updateProduct(id: number, updatedProduct: any) {
    this.http.patch(`https://dummyjson.com/products/${id}`, updatedProduct).subscribe({
      next: (response) => {
        console.log('Recipe updated successfully:', response);
        this.getProducts();
      },
      error: (error) => {
        console.error('Error updating recipe:', error);
      },
    });
  }

  deleteProduct(id: number) {
    this.http.delete(`https://dummyjson.com/products/${id}`).subscribe({
      next: (response) => {
        console.log('Recipe deleted successfully:', response);
        this.getProducts();
      },
      error: (error) => {
        console.error('Error deleting recipe:', error);
      },
    });
  }
}
