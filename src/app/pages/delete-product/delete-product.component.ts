import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),

  });
  actorForm!: FormGroup;
  actor = {
    name: '',
    role: '',
    skill: ''
  };
  onSubmit() {

    console.warn(this.profileForm.value.firstName);
  }
  ngOnInit() {
    this.actorForm = new FormGroup({
      name: new FormControl(this.actor.name, [
        Validators.required,
        Validators.minLength(4),
        this.forbiddenNameValidator(/bob/i), // <-- Here's how you pass in the custom validator.
      ]),
      role: new FormControl(this.actor.role),
      skill: new FormControl(this.actor.skill, Validators.required),
    });
  }
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
}
