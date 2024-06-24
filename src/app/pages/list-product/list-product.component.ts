import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/types/Product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent  {
  productService = inject(ProductService);
  

  products :Product[]=[];
  ngOnInit(){
    
    this.productService.getAll().subscribe({
      next: (data)=> {
        this.products = data
        console.log(this.products);
      },
        error:(e)=>{
  
          console.log(e);
        },
    })
  }
  handleDelete(id:number){
    if(window.confirm('Delete ?')){
      this.productService.deleteProduct(id).subscribe({
        next: ()=> {
          console.log("xoa");
          this.products = this.products.filter(product => product.id !== id)
        },
          error:(e)=>{
            console.log(e);
          },
      });
    }
  
  }
}
