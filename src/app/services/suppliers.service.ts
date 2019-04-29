import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  uri = "http://localhost:3000/api";
  constructor(
    private http:HttpClient
  ) { }
  getSuppliers(){
    return this.http.get(`${this.uri}/suppliers`);
  }
  getSupplierById(supplierid){
    return this.http.get(`${this.uri}/suppliers/`+supplierid);
  }
  createSupplier(newSupplier){
    return this.http.post(`${this.uri}/suppliers`,newSupplier);
  }
  updateSupplier(newSupplier){
    return this.http.put(`${this.uri}/suppliers/`+newSupplier.id,newSupplier);
  }
  deleteSupplier(supplier){
    return this.http.delete(`${this.uri}/suppliers/`+supplier.id);
  }
}
