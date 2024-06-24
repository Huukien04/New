import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from './types/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 apiUrl ='http://localhost:3000/product'
 http = inject(HttpClient)

getAll(){
  return this.http.get<Product[]>(this.apiUrl);
}
getDetail(id: number){
  return this.http.get(this.apiUrl);
}

addProduct(data: any){
  return this.http.post(this.apiUrl,data);
}
editProduct(id:number,data:any){
  return this.http.put(`${this.apiUrl}/${id}`,data);
}
deleteProduct(id:number){
  return this.http.delete(`${this.apiUrl}/${id}`);

}
}
