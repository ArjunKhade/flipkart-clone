import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SideNavComponent } from "../../components/side-nav/side-nav.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-template',
  imports: [HeaderComponent, SideNavComponent, FooterComponent, RouterModule],
  templateUrl: './main-template.component.html',
  styleUrl: './main-template.component.scss'
})
export class MainTemplateComponent {

}
