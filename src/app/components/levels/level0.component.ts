import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { AsyncPipe, DecimalPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { UUID } from 'crypto';
import { PlayerCodeService } from '../../services/player-code.service';

@Component({
  selector: 'game-component',
  template: `<div 
    id="game-container" 
    class="relative h-full min-h-full" 
    >
    <button class= 'absolute top-4 right-1 bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 mx-4 rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed'>Next Scene</button>
    </div>`,
  styles: [],
  standalone: true,
})

export class Level0Component implements OnInit {
  private app :  PIXI.Application;
  private scene1: PIXI.Container;
  private scene2:  PIXI.Container;
  private scene3 : PIXI.Container;
  private textures: { [key: string]: PIXI.Texture } = {};
  private current_scene: number = 1;


  constructor(private pc: PlayerCodeService) {
    this.app = new PIXI.Application();
    this.scene1 = new PIXI.Container();
    this.scene2 = new PIXI.Container();
    this.scene3 = new PIXI.Container();
  }

  async ngOnInit() {
      await this.loadAssets();
      this.pc.state$.subscribe(async (state) => {	
      if (this.app) {
          this.draw(state,this.app);
        }
      }

  )
}


  private async loadAssets() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error('Game container not found');
    return;
    }

    await this.app.init({
        backgroundColor: 0x1099bb,
        width: gameContainer.clientWidth,
        height: gameContainer.clientHeight,
        backgroundAlpha: 0.9,
       });

    document.getElementById('game-container')?.appendChild(this.app.canvas);

    const assetsToLoad = [
        { alias: 'bg', src: '/public/assets/bg.png' },
        {alias: 'stickman', src: '/public/assets/stickman.png'},
        {alias: 'button', src: '/public/assets/buttons/Pink Button.png'},
    ]  

    console.log('Loading assets:', assetsToLoad);
    PIXI.Assets.add(assetsToLoad);
    try {
        const loadedTextures = await PIXI.Assets.load(assetsToLoad.map(asset => asset.alias)) as { [key: string]: PIXI.Texture };
        this.textures = loadedTextures;
      } catch (error) {
        console.error('Error loading assets:', error);
      }



    }

    private draw(state:any ,app: PIXI.Application) { 
      // remember to change the state: any to a more fitting thing using classes
      const button = this.createSprite(this.textures['button'], 10, 10, 100, 100);
      app.stage.addChild(button)
      // each scene is loaded and unloaded after a flag is checked in an observable?
      this.draw_scene1(app);
      this.draw_scene2(app);
      this.draw_scene3(app);
      }

    private draw_scene1(app: PIXI.Application) {
      const height = app.screen.height;
      const width = app.screen.width;
      const background = this.createSprite(this.textures['bg'],0,0, width,height);
      this.scene1.addChild(background);

      const stickman = this.createSprite(this.textures['stickman'], 0.4*width, 0.3* height, 0.2*width, 0.5* height);
      this.scene1.addChild(stickman);

      app.stage.addChild(this.scene1);
    }

    private draw_scene2(app: PIXI.Application) {
    }

    private draw_scene3(app: PIXI.Application) { 
    }

    private createSprite(texture: PIXI.Texture | undefined, x: number, y: number, width: number, height: number){
        const sprite = new PIXI.Sprite(texture);
        // Set position and size for each tile
        sprite.x = x;
        sprite.y = y;
        sprite.pivot.set(0.5, 0.5);
        sprite.width = width;
        sprite.height = height;
        return sprite;
    }

  
}