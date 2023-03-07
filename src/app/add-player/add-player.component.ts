import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  constructor(private playerservice: PlayerService) { }

  player: Player = new Player();
  submitted = false;

  ngOnInit(): void {
    this.submitted = false;
  }
  playersaveform = new FormGroup({
    player_name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    player_email: new FormControl('', [Validators.required, Validators.email]),
    player_password: new FormControl('', [Validators.required])
  })
  savePlayer() {
    this.player = new Player();
    this.player.player_name = this.PlayerName?.value ?? "";
    this.player.player_mail = this.PlayerEmail?.value ?? "";
    this.submitted = true;
    this.save();
  }
  save() {
    this.playerservice.createPlayer(this.player)
      .subscribe(data => console.log(data), error => console.log(error));
    this.player = new Player();
  }

  get PlayerName() {
    return this.playersaveform.get('player_name');
  }

  get PlayerEmail() {
    return this.playersaveform.get('player_email');
  }

  get PlayerBranch() {
    return this.playersaveform.get('player_branch');
  }

  addPlayerForm() {
    this.submitted = false;
    this.playersaveform.reset();
  }
}
