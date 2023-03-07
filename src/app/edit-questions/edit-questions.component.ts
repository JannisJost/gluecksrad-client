import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css']

})
export class EditQuestionsComponent implements OnInit {
  constructor(private questionService: QuestionService, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.questionService.getQuestionList().subscribe(value => {
      this.questions.next(value);
    })
    this.categoryService.getCategoryList().subscribe(value => {
      this.selectedCategory = value[0];
      this.categories.next(value);
    })
  }

  question: Question = new Question();
  questions: BehaviorSubject<Question[]> = new BehaviorSubject([new Question()]);
  categories: BehaviorSubject<Category[]> = new BehaviorSubject([new Category()]);
  selectedCategory: Category = new Category;


  questionsaveform = new FormGroup({
    question_value: new FormControl('', [Validators.required, Validators.minLength(5)]),
    right_answer: new FormControl('', [Validators.required, Validators.minLength(2)]),
    wrong_answer: new FormControl('', [Validators.required, Validators.minLength(2)])
  })
  saveQuestion() {
    this.question = new Question();
    this.question.question = this.QuestionValue?.value ?? "";
    this.question.rightAnswer = this.QuestionRightAnswer?.value ?? "";
    this.question.wrongAnswer = this.QuestionWrongAnswer?.value ?? "";
    this.question.category = this.selectedCategory;
    this.save();
  }
  save() {
    this.questionService.createQuestion(this.question).subscribe(value => {
      this.questionsaveform.reset();
      this.reloadQuestions();
    });
    this.question = new Question();
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
  reloadQuestions() {
    this.questionService.getQuestionList().subscribe(data => {
      this.questions.next(data);
    });
  }
  onCategoryChange(category: Category) {
    this.selectedCategory = category;
  }
}
