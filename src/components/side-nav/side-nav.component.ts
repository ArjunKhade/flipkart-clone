import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-side-nav',
  imports: [MatButtonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateTo(route: string) {
     this.router.navigate([route], { relativeTo: this.route });
  }

}
