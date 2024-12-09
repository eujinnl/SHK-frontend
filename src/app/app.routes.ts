import { Routes } from '@angular/router';
import { WelcomeViewComponent } from './views/welcome.view';
import { GameViewComponent } from './views/game.view';
import { LevelSelectViewComponent } from './views/level.view';
import { LeaderboardViewComponent } from './views/leaderboard.view';
import { AchievementsViewComponent } from './views/achievements.view';

export const routes: Routes = [
    // { path: '**', redirectTo: '' },
    { path: '', component: WelcomeViewComponent, pathMatch: 'full' },
    { path: 'levels', component: LevelSelectViewComponent },
    { path: 'game/:level', component: GameViewComponent },
    { path: 'leaderboard', component: LeaderboardViewComponent },
    { path: 'achievements', component: AchievementsViewComponent },
];
