import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisementsComponent } from './advisements.component';

describe('AdvisementsComponent', () => {
  let component: AdvisementsComponent;
  let fixture: ComponentFixture<AdvisementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
