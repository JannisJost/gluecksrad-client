import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Word } from '../word';
import { WordService } from '../word.service';



@Component({
  selector: 'app-edit-words',
  templateUrl: './edit-words.component.html',
  styleUrls: ['./edit-words.component.css']
})
export class EditWordsComponent implements OnInit {
  isupdated: boolean = false;
  submitted: boolean = false;
  constructor(private wordservice: WordService, private categoryService: CategoryService) { }

  words: BehaviorSubject<Word[]> = new BehaviorSubject([new Word()]);
  wordToAdd: Word = new Word();
  categories: BehaviorSubject<Category[]> = new BehaviorSubject([new Category()]);
  selectedCategory: Category = new Category;

  ngOnInit(): void {
    this.isupdated = false;
    this.submitted = false;
    this.wordservice.getWordsList().subscribe(data => {
      this.words.next(data);
    });
    this.categoryService.getCategoryList().subscribe(value => {
      this.selectedCategory = value[0];
      this.categories.next(value);
    })
  }
  playersaveform = new FormGroup({
    word_value: new FormControl('', [Validators.required, Validators.minLength(2)]),
  })
  saveWord() {
    this.wordToAdd = new Word();
    this.wordToAdd.word = this.WordValue?.value ?? "";
    this.wordToAdd.category = this.selectedCategory;
    this.playersaveform.reset();
    this.submitted = true;
    this.save();
  }
  save() {
    this.wordservice.createWord(this.wordToAdd)
      .subscribe(data => {
        this.reloadWords();
      });
    this.wordToAdd = new Word();
  }
  reloadWords() {
    this.wordservice.getWordsList().subscribe(data => {
      this.words.next(data);
    });
  }
  get WordValue() {
    return this.playersaveform.get('word_value');
  }

}
