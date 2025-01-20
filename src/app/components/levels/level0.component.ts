import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import '@pixi/unsafe-eval';
import { AsyncPipe, DecimalPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { UUID } from 'crypto';
import { PlayerCodeService } from '../../services/player-code.service';
import { gameState } from '../../utils/utils';

@Component({
  selector: 'game-component',
  template: `<div 
    id="game-container" 
    class="relative h-full min-h-full" 
    >
    <!-- <button class= 'absolute bottom-2 right-1 bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 mx-4 rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed'>Next Scene</button> -->
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
  private screenHeight!: number;
  private screenWidth!: number;



  constructor(private pc: PlayerCodeService) {
    this.app = new PIXI.Application();
    this.scene1 = new PIXI.Container();
    this.scene2 = new PIXI.Container();
    this.scene3 = new PIXI.Container();
  }

  async ngOnInit() {
      await this.loadAssets();
      this.pc.state$.subscribe(state => {	
        console.log('State:', state);
        if (this.app) {
            this.draw(state,this.app);
          }
      });
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
        {alias: 'oogway', src: '/public/assets/oogway.png'},
        {alias: 'donald_hair', src: '/public/assets/hair/donald.png'},
        {alias: 'black_hair', src: '/public/assets/hair/black.png'},
        {alias: 'shirt', src: '/public/assets/shirt.png'},
        {alias: 'pant', src: '/public/assets/pant.png'},
    ]  

    console.log('Loading assets:', assetsToLoad);
    PIXI.Assets.add(assetsToLoad);
    try {
        const loadedTextures = await PIXI.Assets.load(assetsToLoad.map(asset => asset.alias)) as { [key: string]: PIXI.Texture };
        this.textures = loadedTextures;
      } catch (error) {
        console.error('Error loading assets:', error);
      }
      this.screenHeight = this.app.screen.height;
      this.screenWidth = this.app.screen.width;

    }

    private async draw(state:gameState ,app: PIXI.Application) { 
      // remember to change the state: any to a more fitting thing using classes
      // const button = this.createSprite(this.textures['button'], 10, 10, 100, 100);
      // app.stage.addChild(button)
      // each scene is loaded and unloaded after a flag is checked in an observable?
      this.draw_scene1(app);
      this.draw_scene2(app,state);
      this.draw_scene3(app);
      switch (state.currentScene){
        case 1:
          this.scene1.visible = true;
          this.scene2.visible = false;
          this.scene3.visible = false;
          break;
        case 2:
          this.scene1.visible = false;
          this.scene2.visible = true;
          this.scene3.visible = false;
          break;
        case 3:
          this.scene1.visible = false;
          this.scene2.visible = false;
          this.scene3.visible = true;
          break;
        }


      }

    private draw_scene1(app: PIXI.Application) {

      const background = this.createSprite(this.textures['bg'],0,0, this.screenWidth,this.screenHeight);
      this.scene1.addChild(background);

      const stickman = this.createSprite(this.textures['stickman'], 0.4*this.screenWidth, 0.3* this.screenHeight, 0.2*this.screenWidth, 0.5* this.screenHeight);
      this.scene1.addChild(stickman);

      const message = new PIXI.Text({
        text:"Hi, we just found this old Arcade Machine in Prof. Turtles house. You seem to be trapped in here, who are you?",
        style:{
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x000000,
        align: 'center',
        wordWrap: true,
        wordWrapWidth: this.screenWidth - 40,
      }}


      );
      message.x = 20;
      message.y = 20;
      this.scene1.addChild(message);

      app.stage.addChild(this.scene1);
    }

    private draw_scene2(app: PIXI.Application, state: gameState) {

      const background = this.createSprite(this.textures['bg'],0,0, this.screenWidth,this.screenHeight);
      this.scene2.addChild(background);

      const stickman = this.createSprite(this.textures['stickman'], 0.6*this.screenWidth, 0.3* this.screenHeight, 0.2*this.screenWidth, 0.5* this.screenHeight);
      // this.scene2.addChild(stickman);

      const oogway = this.createSprite(this.textures['oogway'], 0.2*this.screenWidth, 0.3* this.screenHeight, 0.2*this.screenWidth, 0.5* this.screenHeight);
      this.scene2.addChild(oogway);

      const donald = this.createSprite(this.textures['donald_hair'], 0.61*this.screenWidth, 0.31 * this.screenHeight, 0.15*this.screenWidth, 0.15* this.screenHeight);

      const black = this.createSprite(this.textures['black_hair'], 0.6*this.screenWidth, 0.1* this.screenHeight, 0.2*this.screenWidth, 0.3* this.screenHeight);

      // if(state.hair_shape === 'donald'){
      //   if (state.hair_color){
      //     donald.tint = state.hair_color;
      //   }
      //   this.scene2.addChild(donald);
      // }
      // else if(state.hair_shape === 'black'){
      //   if (state.hair_color){
      //     black.tint = state.hair_color;
      //   }
      //   this.scene2.addChild(black);
      // }
      // else if(state.hair_shape === 'bald'){
      //   // do nothing
      // }

      // if(state.hair_color){

      // }


      const message = new PIXI.Text({
        text:"We will try to help you get out of here, seems like we need to learn Python together. We can’t really see you, I think you need to define your variables!",
        style:{
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x000000,
        align: 'center',
        wordWrap: true,
        wordWrapWidth: this.screenWidth - 40,
      }});
      message.x = 20;
      message.y = 20;
      this.scene2.addChild(message);

      if (state.hair_shape || state.hair_color || state.shirt_color || state.pant_color || state.shoe_color){
        const character = this.createCharacter(state.hair_shape, state.hair_color, state.shirt_color, state.pant_color, state.shoe_color);
        this.scene2.addChild(character);
        character.x = 0.52*this.screenWidth;
        character.y = 0.2* this.screenHeight
        character.width = 0.3*this.screenWidth;
        character.height = 0.6* this.screenHeight;
      }
      else{
        this.scene2.addChild(stickman)
      }
      // if state.confirmation is false, draw a confirmation textbox and a button when pressed, turns state.confirmation to true

      app.stage.addChild(this.scene2);

      if (state.confirmation === false){
        console.log('Confirmation is false');
        const confirmation = new PIXI.Text({
          text:"Are you sure this to be your final appearance?",
          style:{
          fontFamily: 'Arial',
          fontSize: 24,
          fill: 0x000000,
          align: 'center',
          wordWrap: true,
          wordWrapWidth: this.screenWidth - 40,
        }});
        confirmation.x = this.screenWidth * 0.1;
        confirmation.y = this.screenWidth * 0.4;
        this.scene2.addChild(confirmation);

        const button = this.createSprite(this.textures['button'], 0.3*this.screenWidth, 0.8*this.screenHeight, 0.2*this.screenWidth, 0.1*this.screenHeight);
        button.interactive = true;
        (button as PIXI.Sprite & { buttonMode: boolean }).buttonMode = true;
        button.on('pointerdown', () => {
          console.log("next scene")
          this.pc.updateVariable('confirmation', true);
        });
        this.scene2.addChild(button);
      }
    }

    private draw_scene3(app: PIXI.Application) { 
      const confirmation = new PIXI.Text({
        text:"Scene 3",
        style:{
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0x000000,
        align: 'center',
        wordWrap: true,
        wordWrapWidth: this.screenWidth - 40,
      }});
      confirmation.x = this.screenWidth * 0.1;
      confirmation.y = this.screenWidth * 0.4;
      this.scene3.addChild(confirmation);

      app.stage.addChild(this.scene3);

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

    private createCharacter(hair_shape?: string, hair_color?: string,shirt_color?: string, pant_color?: string, shoe_color?: string){
      const character = new PIXI.Container();
      var hair: PIXI.Sprite;

      const stickman1 = this.createSprite(this.textures['stickman'], 50,50,200,300);
      character.addChild(stickman1);
      if(hair_shape==='donald'){
        const hair = this.createSprite(this.textures['donald_hair'], 82, 51, 120, 100);
        if (hair_color){
          hair.tint = hair_color;
        }
        character.addChild(hair);
      }
      else if(hair_shape==='black'){
        const hair = this.createSprite(this.textures['black_hair'], 105, 50, 100, 100);
        if (hair_color){
          hair.tint = hair_color;
        }
        character.addChild(hair);
      }
      if (shirt_color){
        const shirt = this.createSprite(this.textures['shirt'], 105,140,99,130);
        shirt.tint = shirt_color;
        character.addChild(shirt);
      }
      if (pant_color){
        const pant = this.createSprite(this.textures['pant'],105,200,99,130);
        pant.tint = pant_color;
        character.addChild(pant);
      }
      if (shoe_color){
        const shoe = this.createSprite(this.textures['shoe'], 0, 0, 0.2*this.screenWidth, 0.5*this.screenHeight);
        shoe.tint = shoe_color;
        character.addChild(shoe);
      }
      return character;
    }
  
}