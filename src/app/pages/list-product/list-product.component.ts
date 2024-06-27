import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/types/Product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  productService = inject(ProductService);
route=inject(ActivatedRoute);
categoryService = inject(CategoryService);
  products: Product[] = [];
  ngOnInit() {

    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      if (categoryId) {
      
        
        // this.categoryService.getProductsByCategory(categoryId).subscribe({
          this.productService.getDetail(categoryId).subscribe({
          next: (data) => {
            // this.products = data;
          },
          error: (err) => {
            console.error('Error fetching products by category:', err);
          }
        });
      } else {
        // Handle case when no category ID is provided
        console.error('No category ID provided');
      }
    });

//     this.productService.getAll().subscribe({
//       next: (data) => {
//         this.products = data
//         this.route.params.subscribe((param)=>{
// this.categoryService.getProductbyCategory(param['id']).subscribe({
//   next:(data2)=>{
//     this.product=data2;
//   }
// })
//         })
//         console.log(this.products);
//       },
//       error: (e) => {

//         console.log(e);
//       },
//     })
   }
  handleDelete(id: string) {
    if (window.confirm('Delete ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log("xoa");
          this.products = this.products.filter(product => product.id !== id)
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

  }
}
