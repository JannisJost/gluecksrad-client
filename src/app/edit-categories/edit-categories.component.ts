import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent {
  isupdated: boolean = false;
  submitted: boolean = false;
  constructor(private categoryservice: CategoryService) { }

  categories: BehaviorSubject<Category[]> = new BehaviorSubject([new Category()]);
  categoryToAdd: Category = new Category();


  ngOnInit(): void {
    this.isupdated = false;
    this.submitted = false;
    this.categoryservice.getCategoryList().subscribe(data => {
      this.categories.next(data);
    });
  }
  categorysaveform = new FormGroup({
    category_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  })
  saveCategory() {
    this.categoryToAdd = new Category();
    this.categoryToAdd.name = this.CategoryName?.value ?? "";
    this.categorysaveform.reset();
    this.submitted = true;
    this.save();
  }
  save() {
    this.categoryservice.createCategory(this.categoryToAdd).subscribe(value => {
      this.reloadCategories();
    })
    this.categoryToAdd = new Category();
  }
  get CategoryName() {
    return this.categorysaveform.get('category_name');
  }
  reloadCategories() {
    this.categoryservice.getCategoryList().subscribe(data => {
      this.categories.next(data);
    });
  }
}
