import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import { Product } from '../product';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
productList:undefined | Product[]
productMessage:undefined|string
icon=faTrash;
editicon=faEdit
  constructor(private product:ProductService) { }

  ngOnInit(): void {
   this.list();
  }
  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product Deleted Successfully"
        this.list();
      }

    })
    setTimeout(()=>{
      this.productMessage=undefined
    })

  }
  list(){
    this.product.productList().subscribe((result)=>{
      if(result){
      this.productList=result;}
    })
  }


}
