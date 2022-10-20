import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined|Product[]
  
   message:string=''
  constructor(private activeroute:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {

    let query = this.activeroute.snapshot.paramMap.get('query')
    query && this.product.searchProducts(query).subscribe((result)=>{
      if(result){
    this.searchResult=result;
      }
    })
    
  }
  
}
