import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../category';
import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-word-entry',
  templateUrl: './word-entry.component.html',
  styleUrls: ['./word-entry.component.css'],
  template: '<div>{{ message }}</div>'
})
export class WordEntryComponent {
  editMode: boolean = false;
  wordToAdd: Word = new Word();
  selectedCategory: Category = new Category();
  wordsaveform: FormGroup;
  deleted: boolean = false;

  @Input() word: Word = new Word();
  @Input() categories: BehaviorSubject<Category[]> = new BehaviorSubject([new Category()]);

  constructor(private wordservice: WordService) {
    this.wordsaveform = new FormGroup({
      word_value: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }


  saveWord() {
    this.wordToAdd = new Word();
    this.wordToAdd.word = this.WordValue?.value ?? "";
    this.wordToAdd.id = this.word.id;
    this.wordToAdd.category = this.selectedCategory;
    this.wordsaveform.reset();
    this.save();
  }
  save() {
    this.wordservice.updateWord(this.wordToAdd)
      .subscribe(data => {
        this.word = data;
      });
    this.wordToAdd = new Word();
    this.switchMode();
  }
  get WordValue() {
    return this.wordsaveform.get('word_value');
  }
  deleteWord() {
    this.wordservice.deleteWord(this.word).subscribe(value => {
      this.deleted = value;
    });
  }
  switchMode() {
    if (!this.editMode) {
      this.wordsaveform.get('word_value')?.setValue(this.word.word);
      this.categories.value.forEach(category => {
        if (category.id == this.word.category.id) {
          this.selectedCategory = category;
        }
      });
    }
    this.editMode = !this.editMode;
  }
}
