import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-prime-chip',
  imports: [ButtonModule,ReactiveFormsModule, ChipModule , MultiSelectModule, FormsModule ],
  templateUrl: './prime-chip.component.html',
  styleUrl: './prime-chip.component.scss'
})
export class PrimeChipComponent {
  cities!: City[];
  selectedCities!: City[];

  formGroup!: FormGroup;

  ngOnInit() {
      this.cities = [
          { name: 'New York123', code: 'NY' },
          { name: 'Rome6', code: 'RM' },
          { name: 'London89', code: 'LDN' },
          { name: 'Istanbul45', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];

      this.formGroup = new FormGroup({
          selectedCities: new FormControl<City[] | null>([{ name: 'Istanbul', code: 'IST' }])
      });
  }
}
