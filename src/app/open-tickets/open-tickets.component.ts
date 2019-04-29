import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { ProductsService } from '../services/products.service';
import { HazmatsService } from '../services/hazmat.service';
import { UsersService } from '../services/users.service';
import { ItemlistsService } from '../services/itemlists.service';
import { OperatorsService } from '../services/operators.service';
import { SuppliersService } from '../services/suppliers.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html',
  styleUrls: ['./open-tickets.component.css']
})
export class OpenTicketsComponent implements OnInit {
  tickets: any;
  products: any;
  hazmats: any;
  users: any;
  openTickets:any[]=[];
  viewingTicket:any;

  constructor(
    private ts:TicketsService,
    private ps:ProductsService,
    private hs:HazmatsService,
    private us:UsersService,
    private is:ItemlistsService,
    private os:OperatorsService,
    private ss:SuppliersService,
    private as:AuthenticationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getTickets();
    this.ps.getProducts().subscribe({
      next:(result:any)=>{
        this.products = result;
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
  getTickets(){
    this.ts.getTickets().subscribe({
      next: (result: any) => {
        this.tickets = result;
        //console.log(this.tickets);
        for(var i=0;i<this.tickets.length;i++){
          if(this.tickets[i].status === "open"){
            this.openTickets.push(this.tickets[i]);
          }
        }
      }
    })
  }
  viewTicket(ticket){
    this.viewingTicket = ticket;
    this.os.getOperatorById(this.viewingTicket.operator_id).subscribe({
      next:(result:any)=>{
        this.viewingTicket.operator = result;
        this.ss.getSupplierById(this.viewingTicket.supplier_id).subscribe({
          next:(result:any)=>{
            this.viewingTicket.supplier = result;
            this.us.getUserById(this.viewingTicket.creator_id).subscribe({
              next: (result:any) => {
                this.viewingTicket.creator = result;
                for(var i=0;i<this.viewingTicket.items.length;i++){
                  for(var j=0;j<this.products.length;j++){
                    if(this.viewingTicket.items[i].item_id === this.products[j].id){
                      this.viewingTicket.items[i].item = this.products[j];
                    }
                  }
                }
                //console.log(this.viewingTicket);
              },
              error: (error:any) => {
                //console.log(error);
              }
            })
          },
          error:(error:any)=>{
            //console.log(error);
          }
        })
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
  acceptTicket(){
    var currentTicket = this.viewingTicket;
    var currentUser = this.as.currentUser();
    //console.log(currentTicket);
    //console.log(currentUser);
    this.ts.acceptTicket(currentTicket,currentUser).subscribe({
      next:(result:any)=>{
        //console.log(result);
        this.router.navigate(['/']);
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
}
