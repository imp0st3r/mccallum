import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri = "http://localhost:3000/api";
  constructor(
    private http:HttpClient
  ) { }
  getUsers(){
    return this.http.get(`${this.uri}/users`);
  }
  getUserById(userid){
    return this.http.get(`${this.uri}/users/`+userid);
  }
  createUser(newUser){
    return this.http.post(`${this.uri}/users`,newUser);
  }
  updateUser(newUser){
    return this.http.put(`${this.uri}/users/`+newUser.id,newUser);
  }
  resetPassword(user){
    return this.http.post(`${this.uri}/users/resetpass/`+user.id,user);
  }
  deleteUser(user){
    return this.http.delete(`${this.uri}/users/`+user.id);
  }
  getUserByEmail(email) {
    return this.http.get(`${this.uri}/users/getuserbyemail/`+email);
  }
}
