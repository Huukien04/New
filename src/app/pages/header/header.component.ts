import { Component, Input, OnInit, inject } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/types/Category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  @Input() categorys:Category[]=[];
  @Input() categoryService=inject(CategoryService);
  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next:(data)=>{
        this.categorys=data; 
      }
    })
    
  }

}
