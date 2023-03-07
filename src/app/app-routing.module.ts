import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AuthGuard } from './auth.guard';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { EditWordsComponent } from './edit-words/edit-words.component';
import { GameComponent } from './game/game.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'start-screen', pathMatch: 'full' },
  { path: 'start-screen', component: StartScreenComponent },
  { path: 'edit-words', component: EditWordsComponent, canActivate: [AuthGuard] },
  { path: 'edit-categories', component: EditCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'edit-questions', component: EditQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'admin-login', component: LoginComponentComponent },
  { path: 'play-game', component: GameComponent },
  { path: 'leader-board', component: LeaderBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
