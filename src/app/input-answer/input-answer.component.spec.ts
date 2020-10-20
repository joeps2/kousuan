import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAnswerComponent } from './input-answer.component';

describe('InputAnswerComponent', () => {
  let component: InputAnswerComponent;
  let fixture: ComponentFixture<InputAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
