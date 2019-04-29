import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HazmatsService {
  uri = "http://localhost:3000/api";
  constructor(
    private http:HttpClient
  ) { }
  getHazMats(){
    return this.http.get(`${this.uri}/hazmats`);
  }
  createHazMat(hazmat){
    return this.http.post(`${this.uri}/hazmats`,hazmat);
  }
  updateHazMat(hazmat){
    return this.http.put(`${this.uri}/hazmats/`+hazmat.id,hazmat);
  }
  deleteHazMat(hazmat){
    return this.http.delete(`${this.uri}/hazmats/`+hazmat.id);
  }
}
