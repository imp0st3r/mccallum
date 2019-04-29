import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {
  uri = "http://localhost:3000/api";
  constructor(
    private http:HttpClient
  ) { }
  getOperators(){
    return this.http.get(`${this.uri}/operators`);
  }
  getOperatorById(operatorid){
    return this.http.get(`${this.uri}/operators/`+operatorid);
  }
  createOperator(newOperator){
    return this.http.post(`${this.uri}/operators`,newOperator);
  }
  updateOperator(newOperator){
    return this.http.put(`${this.uri}/operators/`+newOperator.id,newOperator);
  }
  deleteOperator(operator){
    return this.http.delete(`${this.uri}/operators/`+operator.id);
  }
}
