import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 cartData= new EventEmitter<Product[] | []>()
 
  constructor(private http:HttpClient) { }
  addproduct(data:Product){
    return this.http.post('http://localhost:3000/products',data)
  }
  productList():Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/products')
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id:string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product:Product){
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product)
  }
  carouselProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3')
  }
  popularProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8')
  }
  searchProducts(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddToCart(data:Product){
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]))
    }else{
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }
  removeItemFromCart(productId:number){
    let cartData=localStorage.getItem('localCart')
    if(cartData){
      let items:Product[]= JSON.parse(cartData)
      items=items.filter((item:Product)=>productId!==item.id)
      localStorage.setItem('localCart',JSON.stringify(items))
      this.cartData.emit(items)
    }
  }
  

}
