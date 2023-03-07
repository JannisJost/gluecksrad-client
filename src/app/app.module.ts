import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { EditWordsComponent } from './edit-words/edit-words.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { GameComponent } from './game/game.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { WordEntryComponent } from './word-entry/word-entry.component';
import { CategoryEntryComponent } from './category-entry/category-entry.component';
import { GameoverComponent } from './gameover/gameover.component';
import { QuestionEntryComponent } from './question-entry/question-entry.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { LeaderboardEntryComponent } from './leaderboard-entry/leaderboard-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    EditWordsComponent,
    StartScreenComponent,
    LoginComponentComponent,
    GameComponent,
    EditCategoriesComponent,
    EditQuestionsComponent,
    WordEntryComponent,
    CategoryEntryComponent,
    GameoverComponent,
    QuestionEntryComponent,
    LeaderBoardComponent,
    LeaderboardEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
