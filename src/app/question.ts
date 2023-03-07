import { Category } from "./category";

export class Question {
    id: number = 0;
    question: String = "";
    rightAnswer: String = "";
    wrongAnswer: String = "";
    category: Category = new Category();
}
