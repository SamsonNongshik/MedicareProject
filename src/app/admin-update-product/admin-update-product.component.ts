import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-update-product',
  templateUrl: './admin-update-product.component.html',
  styleUrls: ['./admin-update-product.component.css']
})
export class AdminUpdateProductComponent implements OnInit {
productData:undefined|Product
productMessage:undefined|string

  constructor(private route:ActivatedRoute,private product:ProductService,private router:Router) { }

  ngOnInit(): void {
    let productId= this.route.snapshot.paramMap.get('id')
   productId && this.product.getProduct(productId).subscribe((data)=>{
    this.productData = data;
  })
  }
submit(data:Product){
  if(this.productData){
    data.id=this.productData.id
  }
  this.product.updateProduct(data).subscribe((result)=>{
    if(result){
      this.productMessage="Product Updated Successfully"
    }
  })
  setTimeout(()=>{
    this.productMessage=undefined
  },3000)
  setTimeout(()=>{
    this.router.navigate(['admin-home'])
  },3000)
  

}

}
