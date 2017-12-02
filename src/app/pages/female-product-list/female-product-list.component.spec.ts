import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleProductListComponent } from './female-product-list.component';

describe('FemailProductListComponent', () => {
  let component: FemaleProductListComponent;
  let fixture: ComponentFixture<FemaleProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FemaleProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FemaleProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
