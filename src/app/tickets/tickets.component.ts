import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { ProductsService } from '../services/products.service';
import { OperatorsService } from '../services/operators.service';
import { SuppliersService } from '../services/suppliers.service';
import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from '../services/users.service';
import { HazmatsService } from '../services/hazmat.service';
import { ItemlistsService } from '../services/itemlists.service';
import { faEdit, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
declare var $:any;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  addTicketForm: FormGroup;
  editTicketForm: FormGroup;
  tickets: any;
  suppliers: any;
  operators: any;
  products: any;
  faEdit = faEdit;
  faTrash = faTrash;
  faCalendar = faCalendar;
  formError:String;
  currentTicket:any;
  currentUser: any;
  uploadMessage: any;
  formProducts: any[]=[];
  formProductCount=0;
  eformProducts: any[]=[];
  eformProductCount=0;
  currentHazMat: any;
  currentEHazMat: any;
  currentUTicket: any;
  viewingTicket: any;
  users : any;
  adding: Boolean=false;

  constructor(
    private fb: FormBuilder,
    private ts: TicketsService,
    private ps: ProductsService,
    private os: OperatorsService,
    private ss: SuppliersService,
    private as: AuthenticationService,
    private us: UsersService,
    private hs: HazmatsService,
    private is: ItemlistsService,
    private router: Router
  ) { 
    this.currentUser = this.as.currentUser();
    this.us.getUserByEmail(this.currentUser.email).subscribe({
      next: (result:any) =>{
        this.currentUser = result;
        //console.log(this.currentUser);
        this.createForm();
      },
      error: (error:any)=>{
        //console.log(error);
        this.createForm();
      }
    })
  }

  createForm(){
    //console.log(this.currentUser.id);
    this.addTicketForm = this.fb.group({
      creator_id: new FormControl({value:this.currentUser.id,disabled:true}),
      transaction_date: new FormControl({value:'',disabled:false}),
      reference_number: new FormControl({value:'',disabled:false}),
      customer_name: new FormControl({value:'',disabled:false}),
      job_number: new FormControl({value:'',disabled:false}),
      supplier_id: new FormControl({value:1,disabled:true}),
      operator_id: new FormControl({value:1,disabled:false}),
      file: new FormControl({value:'',disabled:false})
    });
    this.editTicketForm = this.fb.group({
      creator_id: new FormControl({value:'',disabled:true}),
      transaction_date: new FormControl({value:'',disabled:false}),
      reference_number: new FormControl({value:'',disabled:false}),
      customer_name: new FormControl({value:'',disabled:false}),
      job_number: new FormControl({value:'',disabled:false}),
      supplier_id: new FormControl({value:'',disabled:true}),
      operator_id: new FormControl({value:'',disabled:false}),
      efile: new FormControl({value:'',disabled:false})
    });
  }
  ngOnInit() {
    if(this.as.currentUser().role === 'Administrator'){
      this.currentUser = this.as.currentUser();
      this.getTickets();
      this.getSuppliers();
      this.getOperators();
      this.getProducts();
      this.getUsers();
    }else{
      this.router.navigate(['/login']);
    }
    this.getTickets();
    this.getSuppliers();
    this.getOperators();
    this.getProducts();
    this.getUsers();
  }

  uploadFile(files){
    //console.log(files);
    if(files.length === 0)
      return;

      let mimeType = files[0].type;
      if(mimeType.match(/application\/*/) == null){
        this.formError = "Only text types are supported.";
        return;
      }
      this.ts.uploadHazMat(files[0]).subscribe({
        next: (result:any)=>{
          //console.log(result);
          this.uploadMessage = result.message + " (" +result.filename+")"; 
          var newpath = result.path.split('\\');
          //console.log(newpath);
          this.currentHazMat = {
            ticket_id : "",
            link : "http://localhost:3000"
          }
          for(var i=0;i<newpath.length;i++){
            this.currentHazMat.link += "/" + newpath[i];  
          }
          //console.log(this.currentHazMat);
          this.getTickets();
        },
        error: (error:any)=>{
          //console.log(error);
        }
      })
  }
  getUsers(){
    this.us.getUsers().subscribe({
      next: (result: any) => {
        this.users = result;
      },
      error: (error: any) => {
        //console.log(error);
      }
    })
  }
  getProducts(){
    this.ps.getProducts().subscribe({
      next: (result: any) => {
        this.products = result;
      },
      error: (error: any) => {
        //console.log(error);
      }
    })
  }
  getOperators(){
    this.os.getOperators().subscribe({
      next: (result:any) => {
        this.operators = result;
      },
      error: (error:any) => {
        //console.log(error);
      }
    })
  }
  getSuppliers(){
    this.ss.getSuppliers().subscribe({
      next: (result:any) =>{
        this.suppliers = result;
      },
      error: (error: any) => {
        //console.log(error);
      }
    })
  }
  getTickets(){
    this.ts.getTickets().subscribe({
      next:(result:any) => {
        this.tickets = result;
        //console.log(this.tickets);
      },
      error: (error:any) => {
        //console.log(error);
      }
    })
  }
  addProduct(){
    this.formProductCount++;
    this.addTicketForm.addControl("product"+this.formProductCount,new FormControl({value:'',disabled:false}));
    this.addTicketForm.addControl("product"+this.formProductCount+"-supplied",new FormControl({value:0,disabled:false}));
    let newProduct = {
      id : null,
      name : "",
      controlname : "product" + this.formProductCount,
      quantity_supplied: null,
      quantity_received: null,
      quantity_used : null,
      quantity_returned : null
    }
    this.formProducts.push(newProduct);
  }
  addEProduct(){
    this.eformProductCount++;
    this.editTicketForm.addControl("product"+this.eformProductCount,new FormControl({value:'',disabled:false}));
    this.editTicketForm.addControl("product"+this.eformProductCount+"-supplied",new FormControl({value:0,disabled:false}));
    let newProduct = {
      id : null,
      name : "",
      controlname : "product" + this.eformProductCount,
      quantity_supplied: null,
      quantity_received: null,
      quantity_used : null,
      quantity_returned : null
    }
    this.eformProducts.push(newProduct);
  }
  deleteProduct(product){
    //console.log(product);
    this.addTicketForm.removeControl(product.controlname);
    this.addTicketForm.removeControl(product.controlname+"-supplied");
    let index = 0;
    for(var i=this.formProducts.length-1;i>=0;i--){
      if(this.formProducts[i].controlname === product.controlname){
        this.formProducts.splice(i,1);
        index = i;
      }
    }
    if(this.formProducts.length === 0){
      this.formProductCount = 0;
    }
  }
  deleteEProduct(product){
    //console.log(product);
    this.is.deleteItemlists(product).subscribe({
      next: (result:any) => {
        //console.log(result);
        this.editTicketForm.removeControl(product.controlname);
        this.editTicketForm.removeControl(product.controlname+"-supplied");
        let index = 0;
        for(var i=this.eformProducts.length-1;i>=0;i--){
          if(this.eformProducts[i].controlname === product.controlname){
            this.eformProducts.splice(i,1);
            index = i;
          }
        }
        if(this.eformProducts.length === 0){
          this.eformProductCount = 0;
        }
      },
      error: (error:any) => {
        //console.log(error);
      }
    })
  }
  addTicket() {
    this.adding = true;
  }
  createTicket(){
    let newTicket = {
      creator_id : this.addTicketForm.get('creator_id').value,
      supplier_id : this.addTicketForm.get('supplier_id').value,
      operator_id : this.addTicketForm.get('operator_id').value,
      customer_name : this.addTicketForm.get('customer_name').value,
      transaction_date : null,
      reference_number : this.addTicketForm.get('reference_number').value,
      job_number : this.addTicketForm.get('job_number').value
    }
    let ticketDate = this.addTicketForm.get('transaction_date').value;
    let newDate = ticketDate.year + "-" + ticketDate.month + "-" + ticketDate.day;
    //console.log(newDate);
    let transaction_date = new Date(newDate);
    //console.log(transaction_date);
    newTicket.transaction_date = moment(transaction_date).format("YYYY-MM-DD");;
    //console.log(newTicket);
    this.ts.createTicket(newTicket).subscribe({
      next: (result:any) => {
        //console.log(result);
        this.currentTicket = result;
        this.currentHazMat.ticket_id = this.currentTicket.id;
        //console.log(this.currentTicket);
        this.hs.createHazMat(this.currentHazMat).subscribe({
          next: (result: any) => {
            //console.log(result);
            let itemlists = [];
            for(var i=0;i<this.formProducts.length;i++){
              let itemlist = {
                ticket_id : this.currentTicket.id,
                item_id : this.addTicketForm.get(this.formProducts[i].controlname).value,
                quantity_supplied: this.addTicketForm.get(this.formProducts[i].controlname + "-supplied").value,
              }
              itemlists.push(itemlist);
            }
            //console.log(itemlists);
            this.is.createItemlists(itemlists).subscribe({
              next: (result: any) => {
                //console.log(result);
                if(result.length >= this.formProducts.length){
                  this.adding = false;
                  this.clearAddForm(); 
                  this.getTickets();
                }
              },
              error: (error: any) => {
                //console.log(error);
              }
            })
          },
          error: (error: any) => {
            //console.log(error);
          }
        })
      }
    })
  }
  updateTicket(){
    let newTicket = {
      id : this.currentTicket.id,
      creator_id : this.editTicketForm.get('creator_id').value,
      supplier_id : this.editTicketForm.get('supplier_id').value,
      operator_id : this.editTicketForm.get('operator_id').value,
      customer_name : this.editTicketForm.get('customer_name').value,
      transaction_date : null,
      reference_number : this.editTicketForm.get('reference_number').value,
      job_number : this.editTicketForm.get('job_number').value
    }
    let ticketDate = this.editTicketForm.get('transaction_date').value;
    let newDate = ticketDate.year + "-" + ticketDate.month + "-" + ticketDate.day;
    //console.log(newDate);
    let transaction_date = new Date(newDate);
    //console.log(transaction_date);
    newTicket.transaction_date = moment(transaction_date).format("YYYY-MM-DD");
    //console.log(newTicket);
    //console.log(this.currentTicket);
    this.ts.updateTicket(newTicket).subscribe({
      next: (result:any) => {
        //console.log(result);
        if(this.currentHazMat){
          this.currentHazMat.ticket_id = this.currentTicket.id;
          //console.log(this.currentHazMat);
          this.hs.createHazMat(this.currentHazMat).subscribe({
            next: (result: any) => {
              //console.log(result);
              if(this.eformProducts.length > 0){
                this.submitItems();
              }
            },
            error: (error: any) => {
              //console.log(error);
            }
          })
        }else{
          if(this.eformProducts.length > 0){
            this.submitItems();
          }
        }
      }
    })
  }
  submitItems(){
    let itemlists = [];
    //console.log(this.eformProducts);
    for(var i=0;i<this.eformProducts.length;i++){
      let itemlist = {
        id : this.eformProducts[i].id,
        ticket_id : this.currentTicket.id,
        item_id : this.editTicketForm.get(this.eformProducts[i].controlname).value,
        quantity_supplied: this.editTicketForm.get(this.eformProducts[i].controlname + "-supplied").value,
      }
      itemlists.push(itemlist);
    }
    let updateitems = [];
    for(var i=0;i<this.currentTicket.items.length;i++){
      for(var j=itemlists.length-1;j>=0;j--){
         if(this.currentTicket.items[i].id === itemlists[j].id){
           updateitems.push(itemlists[j]);
           itemlists.splice(j,1);
         }
      }
    }
    //console.log(this.currentTicket.items);
    //console.log(itemlists);
    //console.log(updateitems);
    if(itemlists.length > 0){
      this.is.createItemlists(itemlists).subscribe({
        next: (result: any) => {
          //console.log(result);
          if(updateitems.length > 0){
            this.is.updateItemlists(updateitems).subscribe({
              next: (result: any) =>{
                //console.log(result);
                this.getTickets();
                this.clearEditForm();
              },
              error: (error: any) => {
                //console.log(error);
              }
            })
          }else{
            this.getTickets();
            this.clearEditForm();
          }
        },
        error: (error: any) => {
          //console.log(error);
        }
      })
    }else{
      if(updateitems.length > 0){
        this.is.updateItemlists(updateitems).subscribe({
          next: (result: any) =>{
            //console.log(result);
            this.getTickets();
            this.clearEditForm();
          },
          error: (error: any) => {
            //console.log(error);
          }
        })
      }else{
        this.getTickets();
        this.clearEditForm();
      }
    }
    
  }
  deleteTicket(ticket){
    this.currentTicket = ticket;
  }
  confirmDelete(){
    this.ts.deleteTicket(this.currentTicket).subscribe({
      next: (result:any)=>{
        //console.log(result);
        this.getTickets();
      }
    })
  }
  displayDate(){
    //console.log(this.editTicketForm.get('transaction_date').value);
  }
  editTicket(ticket){
    this.currentTicket = ticket;
    if(this.currentTicket.hazmat.length > 0){
      var filename = this.currentTicket.hazmat[0].link.split("/");
      filename = filename[filename.length-1];
      this.currentEHazMat = this.currentTicket.hazmat[0];
    }
    var tdate = this.currentTicket.transaction_date.split("T");
    tdate = tdate[0].split("-");
    tdate = {
      year : Number(tdate[0]),
      month : Number(tdate[1]),
      day : Number(tdate[2])
    }
    //console.log(tdate);
    this.editTicketForm.setValue({
      creator_id : this.currentUser.id,
      supplier_id : this.currentTicket.supplier_id,
      operator_id : this.currentTicket.operator_id,
      customer_name : this.currentTicket.customer_name,
      transaction_date : tdate,
      reference_number : this.currentTicket.reference_number,
      job_number : this.currentTicket.job_number,
      efile: ''
    })
    for(var i=0;i<this.currentTicket.items.length;i++){
      this.eformProductCount++;
      this.editTicketForm.addControl("product"+this.eformProductCount,new FormControl({value:this.currentTicket.items[i].item_id,disabled:false}));
      this.editTicketForm.addControl("product"+this.eformProductCount+"-supplied",new FormControl({value:this.currentTicket.items[i].quantity_supplied,disabled:false}));
      let newProduct = {
        id : this.currentTicket.items[i].id,
        name : this.currentTicket.items[i].name,
        controlname : "product" + this.eformProductCount,
        quantity_supplied: this.currentTicket.items[i].quantity_supplied,
        quantity_received: null,
        quantity_used : null,
        quantity_returned : null
      }
      this.eformProducts.push(newProduct);
    }
  }
  deleteEHazMat(){
    //console.log("deleting hazmat");
    this.hs.deleteHazMat(this.currentEHazMat).subscribe({
      next: (result: any) => {
        //console.log(result);
        this.currentEHazMat = null;
      },
      error: (error: any) =>{
        //console.log(error);
      }
    })
  }
  viewTicket(ticket){
    this.viewingTicket = ticket;
    // //console.log(this.currentTicket);
    //console.log(this.users);
    for(var i=0;i<this.users.length;i++){
      if(this.users[i].id === this.viewingTicket.creator_id){
        this.viewingTicket.user = this.users[i];
      }
    }
    for(var i=0;i<this.suppliers.length;i++){
      if(this.suppliers[i].id === this.viewingTicket.supplier_id){
        this.viewingTicket.supplier = this.suppliers[i];
      }
    }
    for(var i=0;i<this.operators.length;i++){
      if(this.operators[i].id === this.viewingTicket.operator_id){
        this.viewingTicket.operator = this.operators[i];
      }
    }
    for(var i=0;i<this.products.length;i++){
      for(var j=0;j<this.viewingTicket.items.length;j++){
        if(this.products[i].id === this.viewingTicket.items[j].item_id){
          this.viewingTicket.items[j].item = this.products[i];
        }
      }
    }
    //console.log(this.viewingTicket);
  }
  cancelUpdate(){
    this.clearEditForm();
  }
  clearEditForm(){
    for(var i=0;i<this.eformProducts.length;i++){
      this.editTicketForm.removeControl(this.eformProducts[i].controlname);
      this.editTicketForm.removeControl(this.eformProducts[i].controlname+"-supplied");
    }
    this.editTicketForm.reset();
    this.editTicketForm.setValue({
      creator_id : this.currentUser.id,
      supplier_id : 1,
      operator_id : 1,
      customer_name : "",
      transaction_date : '',
      reference_number : "",
      job_number : "",
      efile: ""
    })
    this.eformProducts=[];
    this.eformProductCount=0;
    this.currentTicket = {};
    this.uploadMessage = "";
    this.currentEHazMat = {};
    if(this.currentHazMat){
      this.currentHazMat = null;
    }
    $("#efile").val("");
  }
  clearAddForm(){
    for(var i=0;i<this.formProducts.length;i++){
      this.addTicketForm.removeControl(this.formProducts[i].controlname);
      this.addTicketForm.removeControl(this.formProducts[i].controlname+"-supplied");
    }
    this.addTicketForm.reset();
    this.addTicketForm.setValue({
      creator_id : this.currentUser.id,
      supplier_id : 1,
      operator_id : 1,
      customer_name : "",
      transaction_date : '',
      reference_number : "",
      job_number : "",
      file: ""
    })
    this.formProducts=[];
    this.formProductCount=0;
    this.currentTicket = {};
    this.uploadMessage = "";
    this.currentHazMat = {};
    $("#file").val("");
  }
}
