import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  uri = "http://localhost:3000/api";
  loggedIn:any;
  private lIn = new BehaviorSubject(this.loggedIn);
  loggedI = this.lIn.asObservable();
  curUser:any;
  private cUser = new BehaviorSubject(this.curUser);
  currentU = this.cUser.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  saveToken(token) {
    localStorage.setItem('mccallum-token',token);
    this.lIn.next(this.isLoggedIn());
    this.currentUser();
  };
  getToken() {
    return localStorage.getItem('mccallum-token');
  };
  login(credentials){
    return this.http.post(`${this.uri}/login`,credentials);
  }
  logout() {
    localStorage.removeItem('mccallum-token');
  };
  isLoggedIn() {
    let token = this.getToken();
    if(token){
      let payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
  currentUser() {
    if(this.isLoggedIn()){
      let token = this.getToken();
      let payload = JSON.parse(atob(token.split('.')[1]));
      this.cUser.next(payload);
      //console.log(payload);
      return {
        id: payload.id,
        email : payload.email,
        name : payload.name,
        role : payload.role
      };
    }
  };
}
