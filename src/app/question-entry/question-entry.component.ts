import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../category';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-entry',
  templateUrl: './question-entry.component.html',
  styleUrls: ['./question-entry.component.css']
})
export class QuestionEntryComponent {
  editMode: boolean = false;
  deleted: boolean = false;
  questionToAdd: Question = new Question();
  selectedCategory: Category = new Category();
  questionsaveform: FormGroup;
  @Input() question: Question = new Question();
  @Input() categories: BehaviorSubject<Category[]> = new BehaviorSubject([new Category()]);


  constructor(private questionService: QuestionService) {
    this.questionsaveform = new FormGroup({
      question_value: new FormControl('', [Validators.required, Validators.minLength(2)]),
      right_answer: new FormControl('', [Validators.required, Validators.minLength(2)]),
      wrong_answer: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }
  saveWord() {
    this.questionToAdd = new Question();
    this.questionToAdd.question = this.QuestionValue?.value ?? "";
    this.questionToAdd.rightAnswer = this.QuestionRightAnswer?.value ?? "";
    this.questionToAdd.wrongAnswer = this.QuestionWrongAnswer?.value ?? "";
    this.questionToAdd.id = this.question.id;
    this.questionToAdd.category = this.selectedCategory;
    this.questionsaveform.reset();
    this.save();
  }
  save() {
    this.questionService.updateQuestion(this.questionToAdd)
      .subscribe(data => {
        this.question = data;
      });
    this.questionToAdd = new Question();
    this.switchMode();
  }
  get QuestionValue() {
    return this.questionsaveform.get('question_value');
  }
  get QuestionRightAnswer() {
    return this.questionsaveform.get('right_answer');
  }
  get QuestionWrongAnswer() {
    return this.questionsaveform.get('wrong_answer');
  }
  deleteWord() {
    this.questionService.deleteQuestion(this.question).subscribe(value => {
      this.deleted = value;
    });
  }
  switchMode() {
    if (!this.editMode) {
      this.questionsaveform.get('question_value')?.setValue(this.question.question);
      this.questionsaveform.get('right_answer')?.setValue(this.question.rightAnswer);
      this.questionsaveform.get('wrong_answer')?.setValue(this.question.wrongAnswer);
      this.categories.value.forEach(category => {
        if (category.id == this.question.category.id) {
          this.selectedCategory = category;
        }
      });
    }
    this.editMode = !this.editMode;
  }
}
