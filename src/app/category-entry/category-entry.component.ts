import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.css']
})
export class CategoryEntryComponent {
  editMode: boolean = false;
  categoryToAdd: Category = new Category();
  selectedCategory: Category = new Category();
  categorysaveform: FormGroup;
  @Input() category: Category = new Category();

  constructor(private categoryService: CategoryService) {
    this.categorysaveform = new FormGroup({
      category_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })


  }
  saveCategory() {
    this.categoryToAdd = new Category();
    this.categoryToAdd.name = this.CategoryName?.value ?? "";
    this.categoryToAdd.id = this.category.id;
    this.categorysaveform.reset();
    this.save();
  }
  save() {
    this.categoryService.updateCategory(this.categoryToAdd)
      .subscribe(data => {
        this.category = data;
      });
    this.categoryToAdd = new Category();
    this.switchMode();
  }
  get CategoryName() {
    return this.categorysaveform.get('category_name');
  }
  switchMode() {
    if (!this.editMode) {
      console.log(this.category.name);

      this.categorysaveform.get('category_name')?.setValue(this.category.name);
    }
    this.editMode = !this.editMode;
  }
}
