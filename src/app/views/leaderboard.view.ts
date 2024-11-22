import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
<div class="max-w-xl  mx-auto bg-black border-4 border-yellow-400 rounded-lg overflow-hidden">
  <!-- Header with arrows and level display -->
  <div class="bg-yellow-400 text-black p-4 text-center font-bold text-xl arcade-font uppercase tracking-widest">
    <div class="flex items-center justify-between">
      <!-- Left Arrow Button -->
      <button onclick="prevLevel()" class="text-black bg-black hover:bg-yellow-500 px-3 py-1 rounded-lg text-yellow-400 font-bold transition duration-200">
        &#9664;
      </button>
      <!-- Level Display -->
      <span id="currentLevel" class="text-lg">Level 1</span>
      <!-- Right Arrow Button -->
      <button onclick="nextLevel()" class="text-black bg-black hover:bg-yellow-500 px-3 py-1 rounded-lg text-yellow-400 font-bold transition duration-200">
        &#9654;
      </button>
    </div>
  </div>
  
  <!-- Leaderboard list -->
  <ul id="leaderboard" class="divide-y divide-yellow-600">
    <!-- Default Level 1 Leaderboard -->
    <li class="flex items-center justify-between p-4 text-yellow-400 font-bold arcade-font text-lg">
      <div class="flex items-center space-x-4">
        <span class="text-2xl">#1</span>
        <span class="text-yellow-200">Player One</span>
      </div>
      <span class="text-yellow-200">1000 pts</span>
    </li>
    <li class="flex items-center justify-between p-4 text-yellow-400 font-bold arcade-font text-lg">
      <div class="flex items-center space-x-4">
        <span class="text-2xl">#2</span>
        <span class="text-yellow-200">Player Two</span>
      </div>
      <span class="text-yellow-200">950 pts</span>
    </li>
    <li class="flex items-center justify-between p-4 text-yellow-400 font-bold arcade-font text-lg">
      <div class="flex items-center space-x-4">
        <span class="text-2xl">#3</span>
        <span class="text-yellow-200">Player Three</span>
      </div>
      <span class="text-yellow-200">900 pts</span>
    </li>
  </ul>
</div>

<!-- Tailwind Customization -->
<style>
  /* Arcade-style font */
  .arcade-font {
    font-family: 'Press Start 2P', cursive;
  }
</style>

  `
})
export class LeaderboardViewComponent{
  constructor(private router: Router) {
  }

}
