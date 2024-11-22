import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { AsyncPipe, DecimalPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { UUID } from 'crypto';

@Component({
  selector: 'game-component',
  template: '<div id="test-game-container" class="h-full min-h-full	"></div>',
  styles: [],
  standalone: true,
})

export class LevelTestComponent implements OnInit {
    app  = new PIXI.Application();
    private textures: { [key: string]: PIXI.Texture } = {};


    constructor() {
    }

    async ngOnInit() {
        await this.loadAssets();
        if (this.app) {
            this.draw(this.app);
          }
    

    }

  private async loadAssets() {
    const gameContainer = document.getElementById('test-game-container');
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

    document.getElementById('test-game-container')?.appendChild(this.app.canvas);

    const assetsToLoad = [
        { alias: 'bg', src: '/public/assets/bg.png' },
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
        app.stage.addChild(new PIXI.Sprite(this.textures['bg']));
        const height = app.screen.height;
        const width = app.screen.width;
        const background = this.createSprite(this.textures['bg'],0,0, width,height);
        // app.stage.addChild(background);
    
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