// q: make angular view for achievements
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Achievement } from '../utils/utils';



@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-achievements-view',
  template: `
    <div class="achievements-container">
      <h1>Achievements</h1>
      <div *ngFor="let achievement of achievements" class="achievement">
        <h2>{{ achievement.title }}</h2>
        <p>{{ achievement.description }}</p>
        <small>{{ achievement.date }}</small>
      </div>
    </div>
  `,
  styles: [`
    .achievements-container {
      padding: 20px;
    }
    .achievement {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
    }
  `]
})
export class AchievementsViewComponent {
  achievements: Achievement[] = [
    { title: 'First Level', description: 'Beat the first level', date: '2023-01-01' },
    { title: 'High Score', description: 'Achieved a high score of 1000 points', date: '2023-02-15' },
    { title: 'Completionist', description: 'Completed all levels', date: '2023-03-10' },
    // Add more achievements as needed
  ];
}