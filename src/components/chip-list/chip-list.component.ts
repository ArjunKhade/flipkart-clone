import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, computed, model, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrl: './chip-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipListComponent {
  @Input() options?: any[] | undefined = [];// Available options
  @Input() singleSelection: boolean = false; // Single selection mode
  @Output() selectedItemsChange: EventEmitter<any>  = new EventEmitter<any>(); // Emit selected items
  @ViewChild('searchInput') searchInput!: ElementRef;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentInput = model('');
  readonly selectedItems = signal<any[]>([]);

  //Filtered options excluding selected items
  readonly filteredOptions = computed(() => {
    const searchTerm = this.currentInput().toLowerCase().trim();
    return searchTerm && this.options
      ? this.options.filter(option => option.Label.toLowerCase().includes(searchTerm) && !this.selectedItems().some(item => item.Value === option.Value))
      : [];
  });

  remove(item: any): void {
    this.selectedItems.update(items => items.filter(i => i !== item));
    this.selectedItemsChange.emit(this.selectedItems());
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (value) {
      if (this.singleSelection) {
        this.selectedItems.set([value]); // Replace with new selection
      } else if (!this.selectedItems().includes(value)) {
        this.selectedItems.update(items => [...items, value]);
      }
      this.selectedItemsChange.emit(this.selectedItems());
    }
    this.currentInput.set('');
    this.searchInput.nativeElement.value = '';
    event.option.deselect();
  }

}

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   if (value) {
  //     if (this.singleSelection) {
  //       this.selectedItems.set([value]); // Allow only one item
  //     } else if (!this.selectedItems().includes(value)) {
  //       this.selectedItems.update(items => [...items, value]);
  //     }
  //     this.selectedItemsChange.emit(this.selectedItems());
  //   }

  //   this.currentInput.set('');
  //   event.chipInput!.clear();
  // }

  

