import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex bg-welcome w-full h-full justify-center items-center  bg-center bg-cover bg-no-repeat">
      <div class="flex-col flex justify-center items-center content transform translate-y-10">
        <h1 class="outline-black text-4xl font-bold pb-7 object-fill justify-center items-center arcade-font">
          Python Game
        </h1>
        <button class="button-primary pb-8 arcade-font" (click)=navigateToLevelOverview()>
          Play
        </button>
        <button class="button-primary pb-8 arcade-font" (click)=navigateToLeaderboardOverview()>
          Leaderboard
        </button>
        <button class="button-primary pb-8 arcade-font" (click)=navigateToAchievementsOverview()>
          Achievements
        </button>
      </div>
    </div>
  `
})
export class WelcomeViewComponent {
  constructor(private router: Router) {
  }

  navigateToLevelOverview() {
    this.router.navigate(['levels']);
  }

  navigateToLeaderboardOverview(){
    this.router.navigate(['leaderboard']);
  }

  navigateToAchievementsOverview(){
    this.router.navigate(['achievements']);
  }


}
