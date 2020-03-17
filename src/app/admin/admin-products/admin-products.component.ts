import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
// import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
products: {title: string} [];
filteredProducts:any[];
subscription: Subscription;
// tableResource: DataTableResource<Product>;
// items: Product[] = []; 
// itemCount: number;

  constructor(private productService: ProductService) { 
    
  }

  // private initializeTable(products: Product[]) {
  //   // this.tableResource = new DataTableResource(products);
  //   // this.tableResource.query({ offset: 0})//gets records for the current page basedon the current parameter | 0;
  //   // .then(items => this.items = items);
  //   // this.tableResource.count()
  //   // .then(count => this.itemCount = count);

  // }

  // reloadItems(params) {
  // if(!this.tableResource) 
  // return;

  //   this.tableResource.query(params)
  //   .then(items => this.items = items);

  // }

  filter(query: string){
      this.filteredProducts = (query) ?  
     this.products.filter((p: {title: string}) => {
       if (p.title) {
         console.log(p.title)
         console.log(query)
        return p.title.toLowerCase().includes(query.toLowerCase())
       }
     }) : 
     this.products;
    console.log(query);
  }
  ngOnInit() {
    this.subscription = this.productService.getAll()
    .subscribe(products => 
      this.filteredProducts = this.products = products);
      // this.initializeTable(products);
    // console.log(this.products$)
    
    
  }

  onClick(p) {
    console.log(p)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();

  }
}
