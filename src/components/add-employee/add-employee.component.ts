import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RouterModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule,
    MatSelectModule, MatNativeDateModule,    MatCardModule, MatAutocompleteModule,
    ReactiveFormsModule, FormsModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {

  registrationForm!: FormGroup;
  empId: number = 0;
  name: string = '';
  location:  string = '';
  department:  string = '';

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router ,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.empId = Number(this.route.snapshot.paramMap.get("id")); 
    this.createForm();
    if(this.HasId){
      this.getEmployeeById(this.empId);
      this.registrationForm.addControl('id',new FormControl({value: `Employee Id: ${this.empId}`, disabled:true}, [Validators.required]))
    }

  }

  get HasId(){
   return this.empId > 0;
  }

  createForm() {
    this.registrationForm = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      location: new FormControl(this.location),
      department: new FormControl(this.department),
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {

      //edit case
      if(this.HasId){
         this.empService.updateEmployee(this.registrationForm.value, this.empId).subscribe({
          next: response =>{
            console.log('Employee updated successfully', response);
            alert('Employee updated successfully!')
            this.registrationForm.reset();
            this.router.navigate(['/main/employees']);
          },
          error: e =>{
            console.error('Error while updating employee', e);
          }
         })
      }else{
        // add case
        this.empService.addEmployee(this.registrationForm.value).subscribe({
          
          next: response => {
            console.log('Employee added successfully', response);
            alert('Employee added!');
            this.registrationForm.reset();
            this.router.navigate(['/main/employees']);
          },
          error: error => {
            console.error('Error adding employee', error);
          }
          
        })
        
      }

    }
  }
    

  getEmployeeById(empId: number){
    this.empService.getEmployeeById(empId).subscribe({

         next:(response) => {
          console.log(response);
          
          // Efficiently update form values without re-creating the form
          this.registrationForm.patchValue({
            name: response.name,
            location: response.location,
            department: response.department
          });
         },

         error: (e)=>{
           console.error('Error fetching employee by ID:', e);
         }
    })

  }


}
