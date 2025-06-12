import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeChipComponent } from './prime-chip.component';

describe('PrimeChipComponent', () => {
  let component: PrimeChipComponent;
  let fixture: ComponentFixture<PrimeChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
