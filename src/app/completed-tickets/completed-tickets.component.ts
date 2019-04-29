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
  selector: 'app-completed-tickets',
  templateUrl: './completed-tickets.component.html',
  styleUrls: ['./completed-tickets.component.css']
})
export class CompletedTicketsComponent implements OnInit {
  tickets: any;
  products: any;
  hazmats: any;
  users: any;
  completedTickets:any[]=[];
  cviewingTicket:any;

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
          if(this.tickets[i].status === "completed"){
            this.completedTickets.push(this.tickets[i]);
          }
        }
      }
    })
  }
  viewTicket(ticket){
    this.cviewingTicket = ticket;
    this.os.getOperatorById(this.cviewingTicket.operator_id).subscribe({
      next:(result:any)=>{
        this.cviewingTicket.operator = result;
        this.ss.getSupplierById(this.cviewingTicket.supplier_id).subscribe({
          next:(result:any)=>{
            this.cviewingTicket.supplier = result;
            this.us.getUserById(this.cviewingTicket.creator_id).subscribe({
              next: (result:any) => {
                this.cviewingTicket.creator = result;
                this.us.getUserById(this.cviewingTicket.worker_id).subscribe({
                  next:(result:any) =>{
                    this.cviewingTicket.worker = result;
                    for(var i=0;i<this.cviewingTicket.items.length;i++){
                      for(var j=0;j<this.products.length;j++){
                        if(this.cviewingTicket.items[i].item_id === this.products[j].id){
                          this.cviewingTicket.items[i].item = this.products[j];
                        }
                      }
                    }
                    //console.log(this.cviewingTicket );
                  },
                  error: (error:any) =>{
                    //console.log(error);
                  }
                })
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
  reopenTicket(){
    var currentTicket = this.cviewingTicket;
    var currentUser = this.as.currentUser();
    this.ts.acceptTicket(currentTicket,currentUser).subscribe({
      next:(result:any)=>{
        this.router.navigate(['/']);
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
}
