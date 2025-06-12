import { Component } from '@angular/core';
import { PrimeChipComponent } from '../prime-chip/prime-chip.component';
import { ChipListComponent } from '../chip-list/chip-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-likes',
  imports: [ChipListComponent,RouterModule, PrimeChipComponent],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss'
})
export class LikesComponent {
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
