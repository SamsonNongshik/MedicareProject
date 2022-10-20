import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {

  constructor(private admin:AdminService, private router:Router) { }
  showLogin=false;
  authError:string='';

  ngOnInit(): void {
    this.admin.reloadAdmin()
  }
  signUp(data:signUp):void{
    
    this.admin.adminSignUp(data)
      }

      login(data:signUp):void{
        this.authError="";
    this.admin.AdminLogin(data);
    this.admin.isLoginError.subscribe((error)=>{
      if(error){
        this.authError="Please Enter Valid Email or Password"
      }
    })
     
          }   
      

      openLogin(){
        this.showLogin=true;
      }
      openSignUp(){
        this.showLogin=false;
      }
    };
  


