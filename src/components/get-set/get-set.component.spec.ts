import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSetComponent } from './get-set.component';

describe('GetSetComponent', () => {
  let component: GetSetComponent;
  let fixture: ComponentFixture<GetSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
