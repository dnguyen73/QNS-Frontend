import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickSliderComponent } from './slick-slider.component';

describe('SlickSliderComponent', () => {
  let component: SlickSliderComponent;
  let fixture: ComponentFixture<SlickSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlickSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
