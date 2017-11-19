import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleFashionComponent } from './sale-fashion.component';

describe('SaleFashionComponent', () => {
  let component: SaleFashionComponent;
  let fixture: ComponentFixture<SaleFashionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleFashionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
