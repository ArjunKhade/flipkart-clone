import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MFO } from '../dynamic-form/dynamic-form.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-dynamic-form-child',
  imports: [
     CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatPseudoCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
  ],
  templateUrl: './dynamic-form-child.component.html',
  styleUrl: './dynamic-form-child.component.scss'
})
export class DynamicFormChildComponent {
  @Input() parentForm!: FormGroup;        // receive parent form
  @Input() fields: MFO[] = [];            // receive MFO list
  dynamicFormGroup!: FormGroup;         // sub-group to inject in parent form

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: { [key: string]: any } = {};

    this.fields.forEach(field => {
      const validators = [];

      if (field.RequiredField) validators.push(Validators.required);
      if (field.MinLength) validators.push(Validators.minLength(field.MinLength));
      if (field.MaxLength) validators.push(Validators.maxLength(field.MaxLength));

      const defaultValue = field.InputType === 'CHECKBOX'
        ? field.Value === 'true'
        : field.Value;

      group[field.InputName] = [defaultValue || '', validators];
    });

    this.dynamicFormGroup = this.fb.group(group);

    // Attach this group to parent form under `dynamicFields`
    this.parentForm.addControl('dynamicFields', this.dynamicFormGroup);
  }

  onSubmit() {
    if (this.dynamicFormGroup.valid) {
      this.fields.forEach(field => {
        const formValue = this.dynamicFormGroup.get(field.InputName)?.value;
        field.Value = field.InputType === 'CHECKBOX' ? (formValue ? 'true' : 'false') : formValue;
      });

      console.log('Updated MFOs:', this.fields);
    } else {
      this.dynamicFormGroup.markAllAsTouched();
    }
  }

}
