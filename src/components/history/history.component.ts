import { Component, OnInit } from '@angular/core';
import { MainTemplateComponent } from "../../templates/main-template/main-template.component";
import { ChipListComponent } from "../chip-list/chip-list.component";
import { SelectOption } from './model';
import { PrimeChipComponent } from "../prime-chip/prime-chip.component";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  standalone:true,
  imports: []

})
export class HistoryComponent implements OnInit {
  fruits: any[] = [];

  LabelExtractor = (option: any) => option?.Label;
  ValueExtractor = (option: any) => option?.Value;

  ngOnInit(): void {
    this.fruits = [
      { Value: 33, Label: "ICF #1", IsDisabled: false },{ Value: 360, Label: "Newww", IsDisabled: false },
      { Value: 332, Label: "TEST ", IsDisabled: false },
      { Value: 339, Label: "TEST DO NOT ", IsDisabled: false },
      { Value: 340, Label: "TEST DO NOT USE ", IsDisabled: false }
    ];
  }

  onSelectedItemsChange(selectedItems: any) {
    console.log('Selected items:', selectedItems);
  }

 

}
