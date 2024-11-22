import { Component, ViewContainerRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink,  } from '@angular/router';
import { EditorComponent } from '../components/editor/editor.component';
import { CommonModule } from '@angular/common';
import { Level0Component } from '../components/levels/level0.component';
import { Level1Component } from '../components/levels/level1.component';
import { PlayerCodeService } from '../services/player-code.service';
import { levels } from '../utils/utils';


@Component({
  selector: 'app-views',
  standalone: true,
  imports: [EditorComponent,CommonModule],
  template: `
    <div class="flex flex-col bg-white w-screen h-screen">
      <div class="flex-grow flex border-blue-500 border-2 w-full">
        <div class="flex-grow border-blue-500 border-2 w-2/3">
          <ng-container #customPlaceholder class="w-full h-full"></ng-container>
        </div>
        <div class="h-full border-blue-500 border-2 w-1/3">
          <cs-editor             
          (codeSubmitted)="receivePlayerCode($event)"
          ></cs-editor>
          <!-- filler for the monaco code editor -->
        </div>
      </div>
      <div class="h-1/4 flex border-blue-500 border-2 w-full">
        <div class="bg-white flex h-full w-full flex flex-col">
          <div class="border-blue-500 border-2 p-3 font-bold bg-sky-400 w-full overflow-auto">
            console:
          </div>
          <div>
            <!-- filler for the console log component later on -->
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GameViewComponent {

    @ViewChild('customPlaceholder', { read: ViewContainerRef, static: true }) customPlaceholder!: ViewContainerRef;
    levelId !: number;
  
  
    constructor(private route: ActivatedRoute, private router: Router, private pcs: PlayerCodeService) {
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.levelId = Number(params.get('level'));
      console.log('Level ID:', this.levelId);
      // You can now use this.levelId to load the appropriate level or perform other actions
    });

    this.loadComponent();
  }

  private loadComponent() {
    this.customPlaceholder.clear();
    if (this.levelId === 0) {
      this.customPlaceholder.createComponent(Level0Component);
    } else if (this.levelId === 1) {
      this.customPlaceholder.createComponent(Level1Component);
    }
  }

  receivePlayerCode(code: string) {
    this.pcs.submitCode(code, levels[this.levelId]);
  }


}
