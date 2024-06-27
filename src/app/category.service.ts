import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from './types/Category';
import { Product } from './types/Product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl ='http://localhost:4000/category'
  http = inject(HttpClient)
 getAll(){
   return this.http.get<Category[]>(this.apiUrl);
 }
 getProductbyCategory(id: string){
  return this.http.get<Category>(this.apiUrl);
}
getProductsByCategory(id: string) {
  return this.http.get<Product[]>(`${this.apiUrl}/${id}`);
}
}
