import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleFashionComponent } from './female-fashion.component';

describe('FemaleFashionComponent', () => {
  let component: FemaleFashionComponent;
  let fixture: ComponentFixture<FemaleFashionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FemaleFashionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FemaleFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
