import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTrainingComponent } from './http-training.component';

describe('HttpTrainingComponent', () => {
  let component: HttpTrainingComponent;
  let fixture: ComponentFixture<HttpTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpTrainingComponent]
    });
    fixture = TestBed.createComponent(HttpTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
