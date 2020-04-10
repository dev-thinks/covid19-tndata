import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDeathComponent } from './chart-death.component';

describe('ChartDeathComponent', () => {
  let component: ChartDeathComponent;
  let fixture: ComponentFixture<ChartDeathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDeathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
