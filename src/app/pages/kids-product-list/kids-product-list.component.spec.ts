import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsProductListComponent } from './kids-product-list.component';

describe('KidsProductListComponent', () => {
  let component: KidsProductListComponent;
  let fixture: ComponentFixture<KidsProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidsProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
