import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirPollutionWorldComponent } from './air-pollution-world.component';

describe('AirPollutionWorldComponent', () => {
  let component: AirPollutionWorldComponent;
  let fixture: ComponentFixture<AirPollutionWorldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirPollutionWorldComponent]
    });
    fixture = TestBed.createComponent(AirPollutionWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
