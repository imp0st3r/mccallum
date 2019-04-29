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
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { faEdit, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  addReceivedForm: FormGroup;
  addUsedForm: FormGroup;
  addReturnedForm: FormGroup;
  tickets: any;
  products: any;
  hazmats: any;
  users: any;
  workingTickets:any[]=[];
  wviewingTicket:any;
  currentUser:any;
  aRecTicketItem:any;
  aUsedTicketItem:any;
  aRetTicketItem:any;
  faEdit = faEdit;
  faTrash = faTrash;
  faCalendar = faCalendar;

  constructor(
    private ts:TicketsService,
    private ps:ProductsService,
    private hs:HazmatsService,
    private us:UsersService,
    private is:ItemlistsService,
    private os:OperatorsService,
    private ss:SuppliersService,
    private as:AuthenticationService,
    private router:Router,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  createForm(){
    this.addReceivedForm = this.fb.group({
      quantity_received: new FormControl({value:'',disabled:false}),
    })
    this.addUsedForm = this.fb.group({
      quantity_used: new FormControl({value:'',disabled:false}),
    })
    this.addReturnedForm = this.fb.group({
      quantity_returned: new FormControl({value:'',disabled:false}),
    })
  }
  ngOnInit() {
    this.getTickets();
    this.getProducts();
  }
  getTickets(){
    this.currentUser = this.as.currentUser();
    this.ts.getTickets().subscribe({
      next: (result: any) => {
        this.tickets = result;
        //console.log(this.tickets);
        for(var i=0;i<this.tickets.length;i++){
          if(this.tickets[i].status === "in-progress" && this.tickets[i].worker_id===this.currentUser.id){
            this.workingTickets.push(this.tickets[i]);
          }
        }
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
  getProducts(){
    this.ps.getProducts().subscribe({
      next:(result:any)=>{
        this.products = result;
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
  viewTicket(ticket){
    this.wviewingTicket = ticket;
    this.os.getOperatorById(this.wviewingTicket.operator_id).subscribe({
      next:(result:any)=>{
        this.wviewingTicket.operator = result;
        this.ss.getSupplierById(this.wviewingTicket.supplier_id).subscribe({
          next:(result:any)=>{
            this.wviewingTicket.supplier = result;
            this.us.getUserById(this.wviewingTicket.creator_id).subscribe({
              next: (result:any) => {
                this.wviewingTicket.creator = result;
                this.us.getUserById(this.wviewingTicket.worker_id).subscribe({
                  next:(result:any)=>{
                    this.wviewingTicket.worker = result;
                    for(var i=0;i<this.wviewingTicket.items.length;i++){
                      for(var j=0;j<this.products.length;j++){
                        if(this.wviewingTicket.items[i].item_id === this.products[j].id){
                          this.wviewingTicket.items[i].item = this.products[j];
                        }
                      }
                    }
                    //console.log(this.wviewingTicket);
                  },
                  error:(error:any)=>{
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
  dismissTicket(){
    var currentTicket = this.wviewingTicket;
    this.currentUser = this.as.currentUser();
    this.ts.dismissTicket(currentTicket).subscribe({
      next:(result:any)=>{
        //console.log(result);
        this.router.navigate(['/']);
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
  submitTicket(){
    var currentTicket = this.wviewingTicket;
    this.ts.submitTicket(currentTicket).subscribe({
      next:(result:any)=>{
        //console.log(result);
        this.router.navigate(['/']);
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
  addReceived(item){
    this.aRecTicketItem = item;
  }
  submitReceived(){
    this.aRecTicketItem.quantity_received = this.addReceivedForm.get('quantity_received').value;
    //console.log(this.aRecTicketItem);
    this.is.addReceived(this.aRecTicketItem).subscribe({
      next:(result:any)=>{
        //console.log(result);
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
  addUsed(item){
    this.aUsedTicketItem = item;
  }
  submitUsed(){
    this.aUsedTicketItem.quantity_used = this.addUsedForm.get('quantity_used').value;
    //console.log(this.aUsedTicketItem);
    this.is.addUsed(this.aUsedTicketItem).subscribe({
      next:(result:any)=>{
        //console.log(result);
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
  addReturned(item){
    this.aRetTicketItem = item;
  }
  submitReturned(){
    this.aRetTicketItem.quantity_returned = this.addReturnedForm.get('quantity_returned').value;
    //console.log(this.aRetTicketItem);
    this.is.addReturned(this.aRetTicketItem).subscribe({
      next:(result:any)=>{
        //console.log(result);
      },
      error:(error:any)=>{
        //console.log(error);
      }
    })
  }
}
