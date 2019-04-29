import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingTicketsComponent } from './working-tickets.component';

describe('WorkingTicketsComponent', () => {
  let component: WorkingTicketsComponent;
  let fixture: ComponentFixture<WorkingTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
