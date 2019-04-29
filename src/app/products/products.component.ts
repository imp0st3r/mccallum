import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  addProductForm: FormGroup;
  editProductForm: FormGroup;
  products: any;
  faEdit = faEdit;
  faTrash = faTrash;
  formError:String;
  currentProduct:any;
  viewingProduct:any;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private ps:ProductsService,
    private as: AuthenticationService,
    private router: Router
  ) { 
    this.createForm();
  }

  createForm(){
    this.addProductForm = this.fb.group({
      name: new FormControl({value:'',disabled:false}),
      size: new FormControl({value:'',disabled:false}),
      unit: new FormControl({value:'',disabled:false}),
      case_size: new FormControl({value:'',disabled:false}),
      weight_each: new FormControl({value:'',disabled:false}),
      cs_weight: new FormControl({value:'',disabled:false}),
      ea_weight_per_box: new FormControl({value:'',disabled:false}),
      per_box_cs_wt: new FormControl({value:'',disabled:false}),
      date_code: new FormControl({value:'',disabled:false}),
    })
    this.editProductForm = this.fb.group({
      name: new FormControl({value:'',disabled:false}),
      size: new FormControl({value:'',disabled:false}),
      unit: new FormControl({value:'',disabled:false}),
      case_size: new FormControl({value:'',disabled:false}),
      weight_each: new FormControl({value:'',disabled:false}),
      cs_weight: new FormControl({value:'',disabled:false}),
      ea_weight_per_box: new FormControl({value:'',disabled:false}),
      per_box_cs_wt: new FormControl({value:'',disabled:false}),
      date_code: new FormControl({value:'',disabled:false}),
    })
  }
  ngOnInit() {
    if(this.as.currentUser().role === 'Administrator'){
      this.currentUser = this.as.currentUser();
      this.getProducts();
    }else{
      this.router.navigate(['/login']);
    }
  }
  getProducts(){
    this.ps.getProducts().subscribe({
      next:(result:any) => {
        this.products = result;
      },
      error: (error:any) => {
        //console.log(error);
      }
    })
  }
  addProduct(){
    let newProduct = {
      name : this.addProductForm.get('name').value,
      size : this.addProductForm.get('size').value,
      unit : this.addProductForm.get('unit').value,
      case_size : this.addProductForm.get('case_size').value,
      weight_each : this.addProductForm.get('weight_each').value,
      cs_weight : this.addProductForm.get('cs_weight').value,
      ea_weight_per_box : this.addProductForm.get('ea_weight_per_box').value,
      per_box_cs_wt : this.addProductForm.get('per_box_cs_wt').value,
      date_code : this.addProductForm.get('date_code').value
    }
    //console.log(newProduct);
    this.ps.createProduct(newProduct).subscribe({
      next: (result:any) => {
        this.getProducts();
        this.clearAddForm();
      },
      error: (error:any) => {
        alert(error.message);
      }
    })
  }
  clearAddForm(){
    this.addProductForm.setValue({
      name: '',
      size: '',
      unit: '',
      case_size: '',
      weight_each: '',
      cs_weight: '',
      ea_weight_per_box: '',
      per_box_cs_wt: '',
      date_code: ''
    })
    this.currentProduct = {};
  }
  viewProduct(product){
    this.viewingProduct = product;
  }
  deleteProduct(product){
    this.currentProduct = product;
  }
  confirmDelete(){
    this.ps.deleteProduct(this.currentProduct).subscribe({
      next: (result: any) => {
        this.getProducts();
      },
      error: (error: any) => {
        alert(error.message);
      }
    })
  }
  editProduct(product){
    this.currentProduct = product;
    //console.log(this.currentProduct);
    this.editProductForm.setValue({
      name : this.currentProduct.name,
      size : this.currentProduct.size,
      unit : this.currentProduct.unit,
      case_size : this.currentProduct.case_size,
      weight_each : this.currentProduct.weight_each,
      cs_weight : this.currentProduct.cs_weight,
      ea_weight_per_box : this.currentProduct.ea_weight_per_box,
      per_box_cs_wt : this.currentProduct.per_box_cs_wt,
      date_code : this.currentProduct.date_code
    })
  }
  updateProduct(){
    let newProduct = {
      id : this.currentProduct.id,
      name : this.editProductForm.get('name').value,
      size : this.editProductForm.get('size').value,
      unit : this.editProductForm.get('unit').value,
      case_size : this.editProductForm.get('case_size').value,
      weight_each : this.editProductForm.get('weight_each').value,
      cs_weight : this.editProductForm.get('cs_weight').value,
      ea_weight_per_box : this.editProductForm.get('ea_weight_per_box').value,
      per_box_cs_wt : this.editProductForm.get('per_box_cs_wt').value,
      date_code : this.editProductForm.get('date_code').value
    }
    this.ps.updateProduct(newProduct).subscribe({
      next: (result: any) => {
        this.getProducts();
        this.clearEditForm();
      },
      error: (error: any) => {
        alert(error.message);
      }
    })
  }
  clearEditForm(){
    this.editProductForm.setValue({
      name: '',
      size: '',
      unit: '',
      case_size: '',
      weight_each: '',
      cs_weight: '',
      ea_weight_per_box: '',
      per_box_cs_wt: '',
      date_code: ''
    })
    this.currentProduct = {};
  }
}
