import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './Courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: componentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
