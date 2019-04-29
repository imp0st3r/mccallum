import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  uri = "http://localhost:3000/api";
  constructor(
    private http:HttpClient
  ) { }
  getTickets(){
    return this.http.get(`${this.uri}/tickets`);
  }
  createTicket(newTicket){
    return this.http.post(`${this.uri}/tickets`,newTicket);
  }
  updateTicket(newTicket){
    return this.http.put(`${this.uri}/tickets/`+newTicket.id,newTicket);
  }
  deleteTicket(ticket){
    return this.http.delete(`${this.uri}/tickets/`+ticket.id);
  }
  uploadHazMat(hm){
    console.log(hm);
    var formData = new FormData();
    formData.append('file',hm,hm.name)
    return this.http.post(`${this.uri}/uploadhazmat`,formData);
  }
  acceptTicket(ticket,user){
    return this.http.post(`${this.uri}/acceptticket/`+ticket.id+'/'+user.id,{});
  }
  dismissTicket(ticket){
    return this.http.post(`${this.uri}/dismissticket/`+ticket.id,{});
  }
  submitTicket(ticket){
    return this.http.post(`${this.uri}/submitticket/`+ticket.id,{});
  }
}
