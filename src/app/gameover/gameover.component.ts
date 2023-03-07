import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent {
  @Input() game: Game = new Game;
  gamesaveform: FormGroup;


  constructor(private gameService: GameService, private router: Router) {
    this.gamesaveform = new FormGroup({
      player_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })
  }
  get PlayerName() {
    return this.gamesaveform.get('player_name');
  }
  saveGame() {
    this.gameService.saveGame(this.PlayerName?.value ?? "").subscribe(value => {
      if (value) {
        this.router.navigate(["/start-screen"]);
      }
    });
  }
  cancelSaveGame() {
    this.gameService.cancelSave().subscribe(value => {
      this.router.navigate(["/start-screen"]);
    });
  }
}
