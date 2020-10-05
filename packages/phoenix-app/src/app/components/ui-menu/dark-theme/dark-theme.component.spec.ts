import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkThemeComponent } from './dark-theme.component';
import { AppModule } from '../../../app.module';
import { EventDisplayService } from 'src/app/services/event-display.service';
import { UIManager } from 'phoenix-event-display';

describe('DarkThemeComponent', () => {
  let component: DarkThemeComponent;
  let fixture: ComponentFixture<DarkThemeComponent>;

  let eventDisplay: EventDisplayService;
  let uiManager: UIManager;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [EventDisplayService],
      declarations: [DarkThemeComponent]
    })
      .compileComponents();

    eventDisplay = TestBed.get(EventDisplayService);
    uiManager = eventDisplay.getUIManager();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially get dark theme', () => {
    spyOn(uiManager, 'getDarkTheme').and.callThrough();

    component.ngOnInit();
    expect(uiManager.getDarkTheme).toHaveBeenCalled();
  });

  it('should set/toggle dark theme', () => {
    spyOn(uiManager, 'setDarkTheme').and.callThrough();

    expect(component.darkTheme).toBeFalsy();
    component.setDarkTheme();
    expect(component.darkTheme).toBe(true);

    expect(uiManager.setDarkTheme).toHaveBeenCalled();
  });
});