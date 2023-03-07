import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Wordhelper } from '../wordhelper';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(private gameService: GameService) { };
  currentGame: BehaviorSubject<Game> = new BehaviorSubject(new Game());
  wordhelper: Wordhelper = new Wordhelper();
  charactersToGuess: String[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  consonants: String[] = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
  vowels: String[] = ['A', 'E', 'I', 'O', 'U'];
  betableAmounts: number[] = [0, 10, 50, 100, 500, 1000];
  questionAlignment: boolean = false;
  showInfo: boolean = false;
  goodInfo: boolean = false;
  infoMessage: String = "";


  ngOnInit(): void {
    this.gameService.getGame().subscribe(game => {
      console.log(game.gameover)
      this.currentGame.next(game);
    })
  }
  hideInfo() {
    this.showInfo = false;
  }
  guessChar(guess: String) {
    this.questionAlignment = this.chance();
    this.gameService.guessChar(guess).subscribe(value => {
      if (!value) {
        this.showInfo = true;
        this.infoMessage = "Wrong Consonant -1 Live";
        this.goodInfo = false;
        setTimeout(() => {
          this.hideInfo();
        }, 2000);
      }

      this.gameService.getGame().subscribe(game => {
        this.currentGame.next(game);
      })
    });
    console.log(this.currentGame.value.spin);
  }

  spin() {
    this.gameService.spin().subscribe(() => {
      this.gameService.getGame().subscribe(game => {
        this.currentGame.next(game);
      })
    });
  }

  answerQuestion(answer: String) {
    this.gameService.answerQuestion(answer).subscribe(value => {
      this.showInfo = true;
      this.infoMessage = value ? "Right Answer" : "Wrong Answer";
      this.goodInfo = value;
      setTimeout(() => {
        this.hideInfo();
      }, 2000); this.gameService.getGame().subscribe(game => {
        this.currentGame.next(game);
      })
    })
  }

  setQuestionAmount(amount: number) {
    this.gameService.setQuestionAmount(amount).subscribe(value => {
      this.gameService.getGame().subscribe(game => {
        this.currentGame.next(game);
      })
    })
  }
  skipVowelShopping() {
    this.gameService.skipVowelShopping().subscribe(value => {
      this.gameService.getGame().subscribe(game => {
        this.currentGame.next(game);
      })
    })
  }
  chance(): boolean {
    return Math.random() >= 0.5;
  }
  newGame() {
    this.gameService.newGame().subscribe(value => {
      this.gameService.getGame().subscribe(game => {
        this.currentGame.next(game);
      })
    })
  }
}
