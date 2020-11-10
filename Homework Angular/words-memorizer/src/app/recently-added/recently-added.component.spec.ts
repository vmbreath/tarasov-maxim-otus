import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RecentlyAddedComponent} from './recently-added.component';
import {HttpClientModule} from "@angular/common/http";
import {GoLearningComponent} from "../go-learning/go-learning.component";

describe('RecentlyAddedComponent', () => {
  let component: RecentlyAddedComponent;
  let fixture: ComponentFixture<RecentlyAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentlyAddedComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two p "Перевод будет+отображаться тут"', () => {
    fixture = TestBed.createComponent(RecentlyAddedComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const text = compiled.getElementsByTagName('p')[0].textContent + compiled.getElementsByTagName('p')[1].textContent;
    expect(text).toContain('Перевод будетотображаться тут');
  });

  it('should render label "Введите слово на русском"', () => {
    fixture = TestBed.createComponent(RecentlyAddedComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('label')[0].textContent).toContain('Введите слово на русском');
  });

  it('should not render li element in "Слова к изучению"', () => {
    fixture = TestBed.createComponent(RecentlyAddedComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.getElementsByClassName('translation')[0].click();
    expect(compiled.getElementsByClassName('liElement')[0]).toBe(undefined);
  });

});
