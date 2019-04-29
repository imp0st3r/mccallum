import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { faEdit, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  addUserForm: FormGroup;
  editUserForm: FormGroup;
  resetPasswordForm: FormGroup;
  allUsers: any;
  faEdit = faEdit;
  faLock = faLock;
  faTrash = faTrash;
  formError:String;
  currentUser:any;
  viewingUser:any;

  constructor(
    private fb: FormBuilder,
    private users:UsersService,
    private as: AuthenticationService,
    private router: Router
  ) { 
    this.createForm();
  }
  createForm(){
    this.addUserForm = this.fb.group({
      name: new FormControl({value:'',disabled:false}),
      email: new FormControl({value:'',disabled:false}),
      confemail: new FormControl({value:'',disabled:false}),
      password: new FormControl({value:'',disabled:false}),
      confpassword: new FormControl({value:'',disabled:false}),
      role: new FormControl({value:'',disabled:false}),
    })
    this.editUserForm = this.fb.group({
      name: new FormControl({value:'',disabled:false}),
      email: new FormControl({value:'',disabled:false}),
      role: new FormControl({value:'',disabled:false}),
    })
    this.resetPasswordForm = this.fb.group({
      password: new FormControl({value:'',disabled:false}),
      confpassword: new FormControl({value:'',disabled:false})
    })
  }

  ngOnInit() {
    if(this.as.currentUser().role === 'Administrator'){
      this.currentUser = this.as.currentUser();
      this.getUsers();
    }else{
      this.router.navigate(['/login']);
    }
  }
  getUsers(){
    this.users.getUsers().subscribe({
      next: (result:any) => {
        this.allUsers = result;
        //console.log(this.allUsers);
      }
    })
  }
  deleteUser(user){
    this.currentUser = user;
    //console.log(this.currentUser);
  }
  confirmDelete(){
    this.users.deleteUser(this.currentUser).subscribe({
      next: (result:any) => {
        this.getUsers();
      },
      error: (error:any) => {
        alert(error.message);
      }
    })
  }
  resetPassword(user){
    this.currentUser = user;
  }
  updatePassword(){
    if(this.resetPasswordForm.get('password').value != ""){
      if(this.resetPasswordForm.get('confpassword').value != ""){
        if(this.resetPasswordForm.get('password').value === this.resetPasswordForm.get('confpassword').value){
          let newUser = {
            id : this.currentUser.id,
            name : this.currentUser.name,
            email : this.currentUser.email,
            password : this.resetPasswordForm.get('password').value
          }
          this.users.resetPassword(newUser).subscribe({
            next: (result:any) => {
              //console.log(result);
              alert("success");
              this.getUsers();
            },
            error: (error:any) => {
              alert(error);
            }
          })
        }else{
          this.formError = "Passwords do not match."
        }
      }else{ 
        this.formError = "Please confirm the new password."
      }
    }else{
      this.formError = "Please enter a new password."
    }
  }
  editUser(user){
    //console.log(user);
    this.currentUser = user;
    this.editUserForm.setValue({
      name:user.name,
      email:user.email,
      role: user.role
    });
  }
  updateUser(){
    if(this.editUserForm.get('name').value != ""){
      if(this.editUserForm.get('email').value != ""){
        if(this.editUserForm.get('role').value != ""){
          let newUser = {
            id : this.currentUser.id,
            name : this.editUserForm.get('name').value,
            email: this.editUserForm.get('email').value,
            role: this.editUserForm.get('role').value
          }
          //console.log(newUser);
          this.users.updateUser(newUser).subscribe({
            next: (result:any) => {
              //console.log(result);
              this.getUsers();
            }
          })
        }else{
          this.formError = "Please enter a role.";
        }
      }else{
        this.formError = "Please enter an email.";
      }
    }else{
      this.formError = "Please enter a name.";
    }
  }
  viewUser(user){
    this.viewingUser = user;
  }
  addUser(){
    if(this.addUserForm.get('name').value != ""){
      if(this.addUserForm.get('email').value != ""){
        if(this.addUserForm.get('confemail').value != ""){
          if(this.addUserForm.get('email').value === this.addUserForm.get('confemail').value){
            if(this.addUserForm.get('password').value != ""){
              if(this.addUserForm.get('confpassword').value != ""){
                if(this.addUserForm.get('password').value === this.addUserForm.get('confpassword').value){
                  if(this.addUserForm.get('role').value != ""){
                    let newUser = {
                      name : this.addUserForm.get('name').value,
                      email: this.addUserForm.get('email').value,
                      password: this.addUserForm.get('password').value,
                      role: this.addUserForm.get('role').value
                    }
                    this.users.createUser(newUser).subscribe({
                      next: (result:any) => {
                        //console.log(result);
                        this.getUsers();
                      }
                    })
                  }else{
                    this.formError = "Please select a role for the user."
                  }
                }else{
                  this.formError = "The passwords do not match.";
                }
              }else{
                this.formError = "Please confirm the default password.";
              }
            }else{
              this.formError = "Please enter a default password.";
            }
          }else{
            this.formError = "The emails do not match.";
          }
        }else{
          this.formError = "Please confirm the user's email.";
        }
      }else{
        this.formError = "Please enter a user email.";
      }
    }else{
      this.formError = "Please enter a user name.";
    }
  }
}
