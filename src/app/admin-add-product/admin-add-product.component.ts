import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
addProductMessage:string|undefined
  constructor(private product:ProductService,private router:Router) { }

  ngOnInit(): void {
  }
submit(data:Product){
  console.warn(data)
  this.product.addproduct(data).subscribe((result)=>{
  if(result){
    this.addProductMessage="Product Added Succesfully"
  }
  setTimeout(()=>this.addProductMessage=undefined,3000)
  })
  setTimeout(()=>{
    this.router.navigate(['admin-home'])
  },3000)
}
}
