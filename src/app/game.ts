import { Category } from "./category";
import { Question } from './question';

export class Game {
    guessedChars: String[] = [];
    words: String[] = ["eating", "food", "pizza"];
    balance: number = 0;
    spin: boolean = true;
    needToAnswerQuestion: boolean = false;
    nextAction: number = 0;
    lives: number = 3;
    category: Category = new Category();
    question: Question = new Question();
    gameover: boolean = false;
    questionAmount: number = 0;
    rounds: number = 0;
    vowelShopping: boolean = false;
}
