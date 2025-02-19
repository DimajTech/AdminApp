import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationApplicationsComponent } from './registration-applications.component';

describe('RegistrationApplicationsComponent', () => {
  let component: RegistrationApplicationsComponent;
  let fixture: ComponentFixture<RegistrationApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
