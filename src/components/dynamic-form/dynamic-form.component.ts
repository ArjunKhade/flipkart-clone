import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicFormChildComponent } from '../dynamic-form-child/dynamic-form-child.component';

export class MFO {
  Id: number = 0;
  InputFieldTitle: string = '';
  InputFieldDescription: string = '';
  InputType: string = '';
  InputName: string = '';
  ShowIfBlank: boolean = false;
  InputFieldDescriptionOnReport: boolean = false;
  DisplayOnForm: boolean = false;
  ServiceId: number = 0;
  ShowDataOnSameRow: boolean = false;
  RequiredField: boolean = false;
  ShowHistory: boolean = false;
  Options: string[] = [];
  MFDId: number = 0;
  Value: string = '';
  MFDataArea: string = '';
  MFDataAreaIdName: string = '';
  MFDataAreaId: number = 0;
  ClientId: number = 0;
  MinLength?: number;
  MaxLength?: number;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
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
    DynamicFormChildComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit {

  mainForm!: FormGroup;

  fields: MFO[] = [
    {
      ...new MFO(),
      Id: 1,
      InputFieldTitle: 'First Name',
      InputFieldDescription: 'Enter your first name',
      InputType: 'TEXT',
      InputName: 'firstName',
      RequiredField: true,
      Value: 'John',
      DisplayOnForm: true
    },
    {
      ...new MFO(),
      Id: 2,
      InputFieldTitle: 'Notes',
      InputFieldDescription: '',
      InputType: 'TEXTAREA',
      InputName: 'notes',
      Value: '',
      DisplayOnForm: true,
      RequiredField: true,
      MinLength: 10,
      MaxLength: 100,
    },
    {
      ...new MFO(),
      Id: 3,
      InputFieldTitle: 'Gender',
      InputType: 'SELECT',
      InputName: 'gender',
      Options: ['Male', 'Female'],
      RequiredField: true,
      DisplayOnForm: true
    },
    {
      ...new MFO(),
      Id: 4,
      InputFieldTitle: 'Subscription',
      InputType: 'RADIO',
      InputName: 'subscription',
      Options: ['Yes', 'No'],
      Value: 'Yes',
      DisplayOnForm: true,
      RequiredField: true,
    },
    {
      ...new MFO(),
      Id: 5,
      InputFieldTitle: 'Agree to Terms',
      InputType: 'CHECKBOX',
      InputName: 'agree',
      RequiredField: true,
      Value: 'false',
      DisplayOnForm: true
    },
    {
      ...new MFO(),
      Id: 6,
      InputFieldTitle: 'Date of Birth',
      InputType: 'DATE',
      InputName: 'dob',
      DisplayOnForm: true,
      RequiredField: true,
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // Create parent form with static controls
    this.mainForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
      // dynamicFields will be added by child
    });

  }

  onSubmit() {

    //  if (this.mainForm.valid) {
    //     console.log('Full Form Data:', this.mainForm.value);

    //     // Access dynamic field values
    //     const dynamicValues = this.mainForm.get('dynamicFields')?.value;
    //     console.log('Dynamic Field Values:', dynamicValues);
    //   } else {
    //     this.mainForm.markAllAsTouched();
    //   }


    if (this.mainForm.valid) {
      const dynamicGroup = this.mainForm.get('dynamicFields') as FormGroup;

      this.fields.forEach(field => {
        const formValue = dynamicGroup.get(field.InputName)?.value;
        field.Value = field.InputType === 'CHECKBOX'
          ? (formValue ? 'true' : 'false')
          : formValue;
      });

      // 🔹 Print static + dynamic separately
      console.log('Static Fields:', {
        fullName: this.mainForm.get('fullName')?.value,
        email: this.mainForm.get('email')?.value
      });

      console.log('Updated MFOs:', this.fields);

      // 🔹 Full form submission payload
      console.log('Complete Form:', this.mainForm.value);
    } else {
      this.mainForm.markAllAsTouched();
    }


  }

}



