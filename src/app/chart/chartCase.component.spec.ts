import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCaseComponent } from './chartCase.component';

describe('ChartComponent', () => {
  let component: ChartCaseComponent;
  let fixture: ComponentFixture<ChartCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
