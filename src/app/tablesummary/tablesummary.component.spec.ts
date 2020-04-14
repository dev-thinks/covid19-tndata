import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesummaryComponent } from './tablesummary.component';

describe('TablesummaryComponent', () => {
  let component: TablesummaryComponent;
  let fixture: ComponentFixture<TablesummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
