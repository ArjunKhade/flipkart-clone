import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../add-employee/employee.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Employee } from '../add-employee/model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],

  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule]
})

export class EmployeeDetailsComponent implements OnInit {
  private _employeeList = new BehaviorSubject<Employee[]>([]);
  employeeList = this._employeeList.asObservable();
  employees: any[] = [];
  selectedEmployeeId: number | null = null; // for tracking if editing


  constructor(
    private empService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.empService.employees$.subscribe(data => {
      this.employees = data;
    });
    this.getEmployees();
  }

  getEmployees() {
    this.empService.getEmployee().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: error => {
        console.error('Error while getting employees', error);
      }
    })
  }

  delete(id: number) {
    this.empService.deleteEmployee(id).subscribe({
      next: () => {
        console.log(`Deleted employee with ID ${id}`);
        this.getEmployees();
        alert(`Deleted employee with ID ${id}`)
      },
      error: error => {
        console.error('Error deleting employee:', error);
      }
    });
  }

  update(emp: Employee) {
    this.router.navigate([`/main/employees/form/${emp.id}`]);
  }

  addEmployee() {
    this.router.navigate([`/main/employees/form/${0}`]);
  }

}
