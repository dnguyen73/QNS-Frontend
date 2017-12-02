import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadyProductListComponent } from './lady-product-list.component';

describe('LadyProductListComponent', () => {
  let component: LadyProductListComponent;
  let fixture: ComponentFixture<LadyProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadyProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadyProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
