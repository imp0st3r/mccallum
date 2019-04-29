import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uri = "http://localhost:3000/api";
  constructor(
    private http:HttpClient
  ) { }
  getProducts(){
    return this.http.get(`${this.uri}/items`);
  }
  getProductById(productid){
    return this.http.get(`${this.uri}/items/`+productid);
  }
  createProduct(newProduct){
    return this.http.post(`${this.uri}/items`,newProduct);
  }
  updateProduct(newProduct){
    return this.http.put(`${this.uri}/items/`+newProduct.id,newProduct);
  }
  deleteProduct(product){
    return this.http.delete(`${this.uri}/items/`+product.id);
  }
}
