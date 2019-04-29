import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemlistsService {
  uri = "http://localhost:3000/api";
  constructor(
    private http:HttpClient
  ) { }
  getItemlists(){
    return this.http.get(`${this.uri}/itemlists`);
  }
  getItemListsByTicketId(ticketid){
    return this.http.get(`${this.uri}/itemlists/`+ticketid);
  }
  createItemlists(itemlists){
    return this.http.post(`${this.uri}/itemlists`,itemlists);
  }
  updateItemlists(itemlist){
    console.log(itemlist);
    return this.http.put(`${this.uri}/itemlists`,itemlist);
  }
  deleteItemlists(itemlist){
    return this.http.delete(`${this.uri}/itemlists/`+itemlist.id);
  }
  addReceived(itemlist){
    return this.http.post(`${this.uri}/addreceived`,itemlist);
  }
  addUsed(itemlist){
    return this.http.post(`${this.uri}/addused`,itemlist);
  }
  addReturned(itemlist){
    return this.http.post(`${this.uri}/addreturned`,itemlist);
  }
}
