import { Routes } from '@angular/router';
import { MainTemplateComponent } from '../templates/main-template/main-template.component';
import { HeaderComponent } from '../components/header/header.component';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HistoryComponent } from '../components/history/history.component';
import { LikesComponent } from '../components/likes/likes.component';
import { CalendarComponent } from '../components/calendar/calendar.component';


export const routes: Routes = [
  {
    path: 'main',
    component: MainTemplateComponent,
    children: [
      { path: 'employees', 
        // component: EmployeeDetailsComponent  implemented lazy loading
         loadComponent: () =>
          import('../components/employee-details/employee-details.component').then(
            (m) => m.EmployeeDetailsComponent
          )
       },
      { path: 'employees/form/:id', 
        // component: AddEmployeeComponent   implemented lazy loading 
        loadComponent: () =>
          import('../components/add-employee/add-employee.component').then(
            (m) => m.AddEmployeeComponent
          )
      },
      { path: 'header', component: HeaderComponent },
      { path: 'sidenav', component: SideNavComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'likes', component: LikesComponent },
      { path: 'calendar', component: CalendarComponent },

      { path: '', redirectTo: 'main', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main' }
];