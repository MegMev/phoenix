import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateCameraComponent } from './animate-camera.component';
import { EventDisplayService } from '../../../services/event-display.service';
import { PhoenixUIModule } from '../../phoenix-ui.module';

describe('AnimateCameraComponent', () => {
  let component: AnimateCameraComponent;
  let fixture: ComponentFixture<AnimateCameraComponent>;

  const mockEventDisplay = {
    animateThroughEvent: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhoenixUIModule],
      declarations: [AnimateCameraComponent],
      providers: [
        {
          provide: EventDisplayService,
          useValue: mockEventDisplay,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start animation on toggle', () => {
    expect(component.isAnimating).toBeFalsy();

    component.animateCamera();

    expect(component.isAnimating).toBeTruthy();
    expect(mockEventDisplay.animateThroughEvent).toHaveBeenCalled();
  });
});
