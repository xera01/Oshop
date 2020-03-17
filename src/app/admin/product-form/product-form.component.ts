import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {
    title: "",
    imageUrl: '',
    price: '',
    category: ''
    
  };
  initialized : boolean = false
  id;

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
     
}
  
   
  ngOnInit() {
    this.categories$ = this.categoryService.getCategories()
    console.log(this.categories$);
    // this.categories$ = categoryService.getCategories()
    this.id =this.route.snapshot.paramMap.get('id');
    // if(id) this.productService.get(id).pipe(take(1)).valueChanges().subscribe(p => this.product = p);
    if(this.id) {
      this.productService.get(this.id).valueChanges().pipe(take(1))
      .subscribe((p: any) => { 
        this.initialized = true
      this.product = p
      console.log(this.product)
  });
}
  }

  save(product){
  if (this.id) this.productService.update(this.id, product);
  else this.productService.create(product);
    this.productService.create(product);
    console.log(product);

    this.router.navigate(['/admin/products'])
  }

  delete(){
    if(confirm('Are you sure you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
