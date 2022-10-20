import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdminLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }
  adminSignUp(data: signUp) {
    this.http.post('http://localhost:3000/admin', data, { observe: 'response' }).subscribe((result) => {
      if (result) {
        localStorage.setItem('admin', JSON.stringify(result.body));
        this.router.navigate(['admin-home'])
        console.warn("result", result)
      }
    });



  }
  reloadAdmin() {
    if (localStorage.getItem('admin')) {
      this.isAdminLoggedIn.next(true);
      this.router.navigate(['admin-home'])
    }
  }

  AdminLogin(data: login) {
    
    this.http.get(`http://localhost:3000/admin?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        localStorage.setItem('admin', JSON.stringify(result.body));
        this.router.navigate(['admin-home'])
      }
      else {
        this.isLoginError.emit(true);
      }
    }

    )
  }
}
