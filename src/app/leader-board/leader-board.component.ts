import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameRecord } from '../game-record';
import { GameRecordService } from '../game-record.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
  gameRecords: BehaviorSubject<GameRecord[]> = new BehaviorSubject([new GameRecord()]);

  constructor(private gamerecordservice: GameRecordService) { }

  ngOnInit(): void {
    this.gamerecordservice.getGameRecordList().subscribe(data => {
      this.gameRecords.next(data);
    });
  }
}
