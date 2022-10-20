import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
productData:undefined|Product
productQuantity:number=1
removeCart=false
  constructor(private activeroute:ActivatedRoute, private product:ProductService
    ) { }

  ngOnInit(): void {
    let productId= this.activeroute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
     this.productData=result

     let cartData= localStorage.getItem('localCart')
     if(productId && cartData){
      let items = JSON.parse(cartData)
      items= items.filter((item:Product)=>productId== item.id.toString())
      if(items.length){
        this.removeCart=true

      }else{
        this.removeCart=false
      }
     }

    })
  }
   adjustQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1
    }else if(this.productQuantity>1 && val==='min')
    {
      this.productQuantity-=1
    }

   }
   AddToCart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData)
        this.removeCart=true
      }
    }
   }
   RemoveFromCart(productId:number){
      this.product.removeItemFromCart(productId)
      this.removeCart=false
   }
}
