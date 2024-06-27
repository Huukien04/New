import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
productService = inject(ProductService);


  @Input() datachild : string='dulieuconww';
  @Output() dataemiter: EventEmitter<any>=new EventEmitter<any>;
  sendatatoParent(){
  this.dataemiter.emit(this.datachild);
  }
}
