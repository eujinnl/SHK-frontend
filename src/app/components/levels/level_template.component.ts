import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import '@pixi/unsafe-eval';



@Component({
  selector: 'game-component',
  template: '<div id="test-game-container" class="h-full min-h-full	"></div>',
  styles: [],
  standalone: true,
})

export class LevelTestComponent implements OnInit {
  private app :  PIXI.Application;
  private scene1: PIXI.Container;
  private scene2:  PIXI.Container;
  private scene3 : PIXI.Container;
  private textures: { [key: string]: PIXI.Texture } = {};
  private screenHeight!: number;
  private screenWidth!: number;



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

    gameContainer?.appendChild(this.app.canvas);

    
    const assetsToLoad = [
      {alias: 'bg', src: '/public/assets/bg.png' },
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

    private draw(app: PIXI.Application) {

      const background = this.createSprite(this.textures['bg'],0,0, this.screenWidth,this.screenHeight);
      this.scene2.addChild(background);

      const stickman = this.createSprite(this.textures['stickman'], 0.6*this.screenWidth, 0.3* this.screenHeight, 0.2*this.screenWidth, 0.5* this.screenHeight);
      // this.scene2.addChild(stickman);

      const oogway = this.createSprite(this.textures['oogway'], 0.2*this.screenWidth, 0.3* this.screenHeight, 0.2*this.screenWidth, 0.5* this.screenHeight);
      this.scene2.addChild(oogway);





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

            
      // if state.confirmation is false, draw a confirmation textbox and a button when pressed, turns state.confirmation to true

      app.stage.addChild(this.scene2);

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
      });
      this.scene2.addChild(button);
      const character = this.createCharacter('black', "0x000000", "0x000000", "0x000000", "0x000000");
      this.scene2.addChild(character)
      character.x = 0.52*this.screenWidth;
      character.y = 0.2* this.screenHeight
      character.width = 0.3*this.screenWidth;
      character.height = 0.6* this.screenHeight;
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