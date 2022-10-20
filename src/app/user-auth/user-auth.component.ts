import { Component, OnInit } from '@angular/core';
import { signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin=false;
  authError:string='';
  constructor(private user:UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload()
  }
  signUp(data:signUp){
    this.user.userSignUp(data)


  }
  login(data:signUp):void{
    this.authError="";
this.user.userLogin(data);
this.user.isLoginError.subscribe((error)=>{
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




