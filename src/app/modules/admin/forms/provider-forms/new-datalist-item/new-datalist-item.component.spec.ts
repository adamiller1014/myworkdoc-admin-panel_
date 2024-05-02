import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDatalistItemComponent } from './new-datalist-item.component';

describe('NewDatalistItemComponent', () => {
  let component: NewDatalistItemComponent;
  let fixture: ComponentFixture<NewDatalistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDatalistItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDatalistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
