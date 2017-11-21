import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductListComponent } from './new-product-list.component';

describe('NewProductListComponent', () => {
  let component: NewProductListComponent;
  let fixture: ComponentFixture<NewProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
