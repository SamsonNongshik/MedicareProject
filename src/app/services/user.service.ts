import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdminLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(user:signUp){
this.http.post("http://localhost:3000/users",user,{observe:'response'})
.subscribe((result)=>{
  if(result){
    localStorage.setItem('user',JSON.stringify(result.body))
    this.router.navigate(['/'])

  }
})
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  userLogin(data: login) {
    
    console.warn(data)
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/'])
      }
      else {
        this.isLoginError.emit(true);
      }
    }

    )
}
}
