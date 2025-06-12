import { Component } from '@angular/core';

@Component({
  selector: 'app-get-set',
  imports: [],
  templateUrl: './get-set.component.html',
  styleUrl: './get-set.component.scss'
})
export class GetSetComponent {

  name = "";
  displayName = "";
  myName = "Monika";
  email="";

  getName(event: Event) {
    const val = (event.target as HTMLInputElement).value
    // console.log(name);
    this.name = val
  }

  showName() {
    this.displayName = this.name;
  }

  setName() {
    this.name = this.myName;
  }

  getEmail(val:string) {
    console.log(val);
    this.email=val;
  }

  setEmail() {
    this.email = "monu@gmail.com";
  }
}
