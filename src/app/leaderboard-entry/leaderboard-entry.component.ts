import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { GameRecord } from '../game-record';
import { GameRecordService } from '../game-record.service';

@Component({
  selector: 'app-leaderboard-entry',
  templateUrl: './leaderboard-entry.component.html',
  styleUrls: ['./leaderboard-entry.component.css']
})
export class LeaderboardEntryComponent {
  @Input() gamerecord: GameRecord = new GameRecord();
  deleted: boolean = false;

  constructor(protected authService: AuthService, private gamerecordService: GameRecordService) { }

  deleteRecord() {
    this.gamerecordService.deleteGameRecord(this.gamerecord).subscribe(value => {
      this.deleted = value;
    });
  }
}
