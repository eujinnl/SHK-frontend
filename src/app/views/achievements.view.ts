// q: make angular view for achievements
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Achievement } from '../utils/utils';



@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-achievements-view',
  template: `
    <div class="padding-20">
      <h1>Achievements</h1>
      <div *ngFor="let achievement of achievements" class="flex justify-between items-center border border-gray-300 rounded-lg p-4 mb-4">
        <div class="flex-grow">
        <h2 class="text-base font-semibold">{{ achievement.title }}</h2>
        <p class="text-sm text-gray-600">{{ achievement.description }}</p>
        <small class="text-xs text-gray-500">{{ achievement.date }}</small>
        </div>
        <img src="{{achievement.signifier}}" alt="Achievement Image" class="w-12 h-12 object-contain ml-4" />
        </div>
      </div>
  `,
  styles: []
})
export class AchievementsViewComponent {
  achievements: Achievement[] = [
    // { title: 'First Level', description: 'Beat the first level', date: '2023-01-01' },
    // { title: 'High Score', description: 'Achieved a high score of 1000 points', date: '2023-02-15' },
    // { title: 'Completionist', description: 'Completed all levels', date: '2023-03-10' },
    {
      title: "Hi There!",
      signifier: "/public/assets/trophy.png",
      description: "Succesfully define your first variable!",
      date: "2021-08-01",
    },
    // Add more achievements as needed
  ];
}