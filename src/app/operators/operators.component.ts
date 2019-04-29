import { Component, OnInit } from '@angular/core';
import { OperatorsService } from '../services/operators.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  addOperatorForm: FormGroup;
  editOperatorForm: FormGroup;
  operators: any;
  faEdit = faEdit;
  faTrash = faTrash;
  formError:String;
  currentOperator:any;
  viewingOperator:any;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private os:OperatorsService,
    private as: AuthenticationService,
    private router: Router
  ) { 
    this.createForm();
  }

  createForm(){
    this.addOperatorForm = this.fb.group({
      name: new FormControl({value:'',disabled:false}),
      lat: new FormControl({value:'',disabled:false}),
      lng: new FormControl({value:'',disabled:false}),
      city: new FormControl({value:'',disabled:false}),
      state: new FormControl({value:'',disabled:false}),
      atf_license: new FormControl({value:'',disabled:false}),
    })
    this.editOperatorForm = this.fb.group({
      name: new FormControl({value:'',disabled:false}),
      lat: new FormControl({value:'',disabled:false}),
      lng: new FormControl({value:'',disabled:false}),
      city: new FormControl({value:'',disabled:false}),
      state: new FormControl({value:'',disabled:false}),
      atf_license: new FormControl({value:'',disabled:false}),
    })
  }
  ngOnInit() {
    if(this.as.currentUser().role === 'Administrator'){
      this.currentUser = this.as.currentUser();
      this.getOperators();
    }else{
      this.router.navigate(['/login']);
    }
  }
  getOperators(){
    this.os.getOperators().subscribe({
      next:(result:any) => {
        this.operators = result;
      },
      error: (error:any) => {
        //console.log(error);
      }
    })
  }
  viewOperator(operator){
    this.viewingOperator = operator;
    //console.log(this.viewingOperator);
  }
  addOperator(){
    var lat = this.addOperatorForm.get('lat').value;
    var lng = this.addOperatorForm.get('lng').value;
    //console.log(lat);
    //console.log(lng);
    let newOperator = {
      name : this.addOperatorForm.get('name').value,
      lat : this.addOperatorForm.get('lat').value.replace("'","''"),
      lng : this.addOperatorForm.get('lng').value.replace("'","''"),
      city : this.addOperatorForm.get('city').value,
      state : this.addOperatorForm.get('state').value,
      atf_license : this.addOperatorForm.get('atf_license').value
    }
    this.os.createOperator(newOperator).subscribe({
      next: (result:any) => {
        this.getOperators();
      },
      error: (error:any) => {
        alert(error.message);
      }
    })
  }
  deleteOperator(operator){
    this.currentOperator = operator;
  }
  confirmDelete(){
    this.os.deleteOperator(this.currentOperator).subscribe({
      next: (result: any) => {
        this.getOperators();
      },
      error: (error: any) => {
        alert(error.message);
      }
    })
  }
  editOperator(operator){
    this.currentOperator = operator;
    this.editOperatorForm.setValue({
      name : this.currentOperator.name,
      lat : this.currentOperator.lat,
      lng : this.currentOperator.lng,
      city : this.currentOperator.city,
      state : this.currentOperator.state,
      atf_license : this.currentOperator.atf_license
    })
  }
  updateOperator(){
    let newOperator = {
      id : this.currentOperator.id,
      name : this.editOperatorForm.get('name').value,
      lat : this.editOperatorForm.get('lat').value.replace("'","''"),
      lng : this.editOperatorForm.get('lng').value.replace("'","''"),
      city : this.editOperatorForm.get('city').value,
      state : this.editOperatorForm.get('state').value,
      atf_license : this.editOperatorForm.get('atf_license').value
    }
    this.os.updateOperator(newOperator).subscribe({
      next: (result: any) => {
        this.getOperators();
      },
      error: (error: any) => {
        //console.log(error);
      }
    })
  }
}
