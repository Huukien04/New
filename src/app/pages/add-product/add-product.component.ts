import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Category } from 'src/app/types/Category';
import { Product } from 'src/app/types/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {



  selectedImage: string = '';
  currentId: number = 0;
  product: Product[] = [];

@Input() categorys=inject(CategoryService);
  @Input() productService = inject(ProductService);

  @Input() round = false;
  @Input('image-url') imageUrl = '';
  _image = '';
  constructor() { };
  get image() {
    return this._image;
  }
  @Input() set image(value: string) {
    this._image = value.trim();

  }
  
categoryName:Category[]=[];
ngOnInit() {

 this.categorys.getAll().subscribe({
  next:(data)=>{
    this.categoryName=data;
  }
 })
  
    }
  

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      this.forbiddenNameValidator(), 
    ]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required,Validators.minLength(0),Validators.max(10000000000000)]),
    quantity: new FormControl('', [Validators.required,Validators.max(100)]),
    category: new FormControl('Smart Phone',[Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });


  get name() {
    return this.addForm.get('name');
  }
  get price(){
    return this.addForm.get('price');
  }
  get quantity(){
    return this.addForm.get('quantity');
  }
  get category(){
    return this.addForm.get('category')?.value;
  }
  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
      const forbidden = specialCharPattern.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {

      if (file.type.startsWith('image/')) {
        console.log('Selected file is an image:', file);


        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          console.log('File content:', content);

        };
        reader.readAsDataURL(file);
      } else {
        console.error('Selected file is not an image');
        alert('Please select a valid image file.');
      }
    }
  }



  handleAdd() {
    if (this.addForm.valid) {
      this.productService.addProduct(this.addForm.value).subscribe({
        next: () => {
          console.log('Product added successfully');
          this.currentId++;
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
    }
  }


}
