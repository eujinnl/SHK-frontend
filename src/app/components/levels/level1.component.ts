import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { AsyncPipe, DecimalPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { UUID } from 'crypto';

@Component({
  selector: 'game-component',
  template: '<div id="game-container" class="h-full min-h-full	"></div>',
  styles: [],
  standalone: true,
})

export class Level1Component implements OnInit {
    private app :  PIXI.Application;
    private scene1: PIXI.Container;
    private scene2:  PIXI.Container;
    private scene3 : PIXI.Container;
    private textures: { [key: string]: PIXI.Texture } = {};


    constructor() {
      this.app = new PIXI.Application();
      this.scene1 = new PIXI.Container();
      this.scene2 = new PIXI.Container();
      this.scene3 = new PIXI.Container();
    }

    async ngOnInit() {
        await this.loadAssets();
        if (this.app) {
            this.draw(this.app);
          }
    

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
        {alias: 'hair', src: '/public/assets/hair/donald.png'},
    ]  

    console.log('Loading assets:', assetsToLoad);
    PIXI.Assets.add(assetsToLoad);
    try {
        const loadedTextures = await PIXI.Assets.load(assetsToLoad.map(asset => asset.alias)) as { [key: string]: PIXI.Texture };
        console.log('Assets loaded:', loadedTextures);
        this.textures = loadedTextures;
      } catch (error) {
        console.error('Error loading assets:', error);
      }
    }

    private draw(app: PIXI.Application) {
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

      const stickman = this.createSprite(this.textures['stickman'], 400, 300, 500, 500);
      this.scene1.addChild(stickman);

      const hair = this.createSprite(this.textures['hair'], 100, 300, 500, 500);
      hair.tint = 0xff00ff;
      this.scene1.addChild(hair);

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
        sprite.width = width;
        sprite.height = height;
        return sprite;
    }
}