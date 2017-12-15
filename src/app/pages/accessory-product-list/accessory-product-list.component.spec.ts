import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryProductListComponent } from './accessory-product-list.component';

describe('AccessoryProductListComponent', () => {
  let component: AccessoryProductListComponent;
  let fixture: ComponentFixture<AccessoryProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
