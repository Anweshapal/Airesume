import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeInputComponent } from './resume-input.component';

describe('ResumeInputComponent', () => {
  let component: ResumeInputComponent;
  let fixture: ComponentFixture<ResumeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
