import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {levels} from '../utils/utils'
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
  <div class="w-full h-full justify-center items-center flex-column">
    <ng-container *ngFor="let level of levelsArray; let i = index">
        <p (click)="navigateToGameOverview(level.levelInt)">
          {{ level.levelInt }}: {{ level.topic }}
        </p>
        <br *ngIf="i < levelsArray.length - 1">
      </ng-container>
  </div>
  `,
})
export class LevelSelectViewComponent{

  levelsArray = Object.values(levels);


  constructor(private router: Router) {
  }
  navigateToGameOverview(level:number) {
    this.router.navigate(['game', level]);
  }

}
