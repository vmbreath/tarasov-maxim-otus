import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GoLearningComponent} from './go-learning.component';
import {RecentlyAddedComponent} from "../recently-added/recently-added.component";

describe('GoLearningComponent', () => {
  let component: GoLearningComponent;
  let fixture: ComponentFixture<GoLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoLearningComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render div "Статус"', () => {
    fixture = TestBed.createComponent(GoLearningComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.getElementsByClassName('statusWord')[0].textContent).toContain('Статус');
  });

  it('should render three p in div "Статус"', () => {
    fixture = TestBed.createComponent(GoLearningComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.getElementsByTagName('p').length).toBe(3);
  });
});
