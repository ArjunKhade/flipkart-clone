import { Routes } from '@angular/router';
import { MainTemplateComponent } from '../templates/main-template/main-template.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainTemplateComponent,
    children: [
      { path: 'employees', 
         loadComponent: () =>
          import('../components/employee-details/employee-details.component').then(
            (m) => m.EmployeeDetailsComponent
          )
       },

      { path: 'employees/form/:id', 
        loadComponent: () =>
          import('../components/add-employee/add-employee.component').then(
            (m) => m.AddEmployeeComponent
          )
      },

      { path: 'history', 
         loadComponent: () =>
          import('../components/history/history.component').then(
            (m) => m.HistoryComponent
          )
       },

       { path: 'likes', 
         loadComponent: () =>
          import('../components/likes/likes.component').then(
            (m) => m.LikesComponent
          )
       },
       { path: 'calendar', 
         loadComponent: () =>
          import('../components/calendar/calendar.component').then(
            (m) => m.CalendarComponent
          )
       },
        

      { path: '', redirectTo: 'main', pathMatch: 'full' }
    ]
  },

  { path: 'dynamic', 
         loadComponent: () =>
          import('../components/dynamic-form/dynamic-form.component').then(
            (m) => m.DynamicFormComponent
          )
       },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main' }
];