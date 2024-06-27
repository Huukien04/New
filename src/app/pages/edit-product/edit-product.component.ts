import { Component, Input, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/types/Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  selectedImage: string = '';

  route = inject(ActivatedRoute);
  @Input() productId!: string;

  @Input() productService = inject(ProductService)


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




  ngOnInit() {

    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getDetail(param['id']).subscribe({
        next: (data) => {
          this.addForm.patchValue(data);
          console.log(this.addForm);
        },
        error: (err) => {
          console.error('Error edit product:', err);

        }
      });


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
    category: new FormControl('1',[Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });

  get category(){
    return this.addForm.get('category');
  }
  get name() {
    return this.addForm.get('name');
  }
  get price(){
    return this.addForm.get('price');
  }
  get quantity(){
    return this.addForm.get('quantity');
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



  handleEdit() {

       if(this.addForm.invalid){
    this.productService.editProduct(this.productId, this.addForm.value).subscribe({
      next: (data) => {
        console.log('Product added successfully', data);

      },

      error: (err) => {
        console.error('Error adding product:', err);

      }
    })
  }
}
}
