import { Component, ViewContainerRef, ViewChild, EventEmitter, Output, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink,  } from '@angular/router';
import { EditorComponent } from '../components/editor/editor.component';
import { CommonModule } from '@angular/common';
import { Level0Component } from '../components/levels/level0.component';
import { Level1Component } from '../components/levels/level1.component';
import { Logger0Component } from '../components/levels/logger0.component';
import { Level2Component } from '../components/levels/level2.component';
import { LevelTestComponent } from '../components/levels/level_template.component';
import { Logger1Component } from '../components/levels/logger1.component';
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
          <ng-container #uiPlaceholder class="w-full h-full"></ng-container>
        </div>
        <div class="h-full border-blue-500 border-2 w-1/3">
          <cs-editor             
          (codeSubmitted)="receivePlayerCode($event)"
          [monacoCode]="monacoCode()"
          ></cs-editor>
        </div>
      </div>
      <div class="h-1/5 flex border-blue-500 border-2 w-full">
        <div class="bg-white flex h-full w-full flex flex-col">
          <div class="border-blue-500 border-2 p-3 font-bold bg-sky-400 w-full ">
            console:
          </div>
          <div>
          <ng-container #loggerPlaceholder class="w-full h-full"></ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GameViewComponent {

    @ViewChild('uiPlaceholder', { read: ViewContainerRef, static: true }) uiPlaceholder!: ViewContainerRef;
    @ViewChild('loggerPlaceholder', { read: ViewContainerRef, static: true }) loggerPlaceholder!: ViewContainerRef;

    levelId !: number;
    monacoCode= signal('print("Hello world!")');
  
  
    constructor(private route: ActivatedRoute, private router: Router, private pcs: PlayerCodeService) {
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.levelId = Number(params.get('level'));
      // console.log('Level ID:', this.levelId);
      // You can now use this.levelId to load the appropriate level or perform other actions
    });
    this.loadComponent();
    this.pcs.state$.subscribe((state) => {
      this.monacoCode.set(state['code']);
    });
  }

  private loadComponent() {
    this.uiPlaceholder.clear();
    this.loggerPlaceholder.clear();
    switch (this.levelId) {
      case 0:
        this.uiPlaceholder.createComponent(Level0Component);
        this.loggerPlaceholder.createComponent(Logger0Component);
        break;
      case 1:
        this.uiPlaceholder.createComponent(Level1Component);
        this.loggerPlaceholder.createComponent(Logger1Component);
        break;
      // case 2:
      //   this.uiPlaceholder.createComponent(Level2Component);
      //   this.loggerPlaceholder.createComponent(Logger2Component);
      //   break;
      case 305:
        this.uiPlaceholder.createComponent(LevelTestComponent);
        break;
      default:
        console.error('Invalid level ID:', this.levelId);
        break;
    }
  }

  receivePlayerCode(code: string) {
    this.pcs.submitCode(code, levels[this.levelId]);
  }


}
