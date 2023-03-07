import { Category } from "./category";

export class Word {
    id: number = 0;
    word: String | undefined;
    category: Category = new Category();
}
