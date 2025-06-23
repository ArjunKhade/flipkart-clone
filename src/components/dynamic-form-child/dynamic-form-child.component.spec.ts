import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormChildComponent } from './dynamic-form-child.component';

describe('DynamicFormChildComponent', () => {
  let component: DynamicFormChildComponent;
  let fixture: ComponentFixture<DynamicFormChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
