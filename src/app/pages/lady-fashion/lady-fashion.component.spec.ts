import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadyFashionComponent } from './lady-fashion.component';

describe('LadyFashionComponent', () => {
  let component: LadyFashionComponent;
  let fixture: ComponentFixture<LadyFashionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadyFashionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadyFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
