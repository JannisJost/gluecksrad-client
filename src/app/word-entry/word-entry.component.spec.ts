import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordEntryComponent } from './word-entry.component';

describe('WordEntryComponent', () => {
  let component: WordEntryComponent;
  let fixture: ComponentFixture<WordEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
