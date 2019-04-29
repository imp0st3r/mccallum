import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../services/suppliers.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  addSupplierForm: FormGroup;
  editSupplierForm: FormGroup;
  suppliers: any;
  faEdit = faEdit;
  faTrash = faTrash;
  formError:String;
  currentSupplier:any;
  viewingSupplier:any;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private ss:SuppliersService,
    private as: AuthenticationService,
    private router: Router
  ) { 
    this.createForm();
  }

  createForm(){
    this.addSupplierForm = this.fb.group({
      name: new FormControl({value:'',disabled:false}),
      address: new FormControl({value:'',disabled:false}),
      city: new FormControl({value:'',disabled:false}),
      state: new FormControl({value:'',disabled:false}),
      zip: new FormControl({value:'',disabled:false}),
      atf_license: new FormControl({value:'',disabled:false}),
    })
    this.editSupplierForm = this.fb.group({
      name: new FormControl({value:'',disabled:false}),
      address: new FormControl({value:'',disabled:false}),
      city: new FormControl({value:'',disabled:false}),
      state: new FormControl({value:'',disabled:false}),
      zip: new FormControl({value:'',disabled:false}),
      atf_license: new FormControl({value:'',disabled:false}),
    })
  }
  ngOnInit() {
    if(this.as.currentUser().role === 'Administrator'){
      this.currentUser = this.as.currentUser();
      this.getSuppliers();
    }else{
      this.router.navigate(['/login']);
    }
  }
  getSuppliers(){
    this.ss.getSuppliers().subscribe({
      next:(result:any) => {
        this.suppliers = result;
      },
      error: (error:any) => {
        //console.log(error);
      }
    })
  }
  viewSupplier(supplier){
    this.viewingSupplier = supplier;
  }
  addSupplier(){
    let newSupplier = {
      name : this.addSupplierForm.get('name').value,
      address : this.addSupplierForm.get('address').value,
      city : this.addSupplierForm.get('city').value,
      state : this.addSupplierForm.get('state').value,
      zip : this.addSupplierForm.get('zip').value,
      atf_license : this.addSupplierForm.get('atf_license').value
    }
    this.ss.createSupplier(newSupplier).subscribe({
      next: (result:any) => {
        this.getSuppliers();
      },
      error: (error:any) => {
        alert(error.message);
      }
    })
  }
  deleteSupplier(supplier){
    this.currentSupplier = supplier;
  }
  confirmDelete(){
    this.ss.deleteSupplier(this.currentSupplier).subscribe({
      next: (result: any) => {
        this.getSuppliers();
      },
      error: (error: any) => {
        alert(error.message);
      }
    })
  }
  editSupplier(supplier){
    this.currentSupplier = supplier;
    this.editSupplierForm.setValue({
      name : this.currentSupplier.name,
      address : this.currentSupplier.address,
      city : this.currentSupplier.city,
      state : this.currentSupplier.state,
      zip : this.currentSupplier.zip,
      atf_license : this.currentSupplier.atf_license
    })
  }
  updateSupplier(){
    let newSupplier = {
      id : this.currentSupplier.id,
      name : this.editSupplierForm.get('name').value,
      address : this.editSupplierForm.get('address').value,
      city : this.editSupplierForm.get('city').value,
      state : this.editSupplierForm.get('state').value,
      zip : this.editSupplierForm.get('zip').value,
      atf_license : this.editSupplierForm.get('atf_license').value
    }
    this.ss.updateSupplier(newSupplier).subscribe({
      next: (result: any) => {
        this.getSuppliers();
      },
      error: (error: any) => {
        alert(error.message);
      }
    })
  }
}
