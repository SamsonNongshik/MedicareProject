import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
carouselProducts:undefined|Product[]
popularProducts:undefined|Product[]
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.carouselProducts().subscribe((data)=>{
    this.carouselProducts=data;
    })
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data
    }
    )
  }

}
