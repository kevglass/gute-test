import { Bitmap, Game } from "gute/dist";
import { Graphics } from "gute/dist";
import { GameContext } from "gute/dist/GameContext";
import { Sound } from "gute/dist/Sound";
import { Tileset } from "gute/dist/Tileset";

export class TestGame implements Game {
  testImage!: Bitmap;
  testTiles!: Tileset;
  keySound!: Sound;
  mouseSound!: Sound;
  music!: Sound;
  musicStarted: boolean = false;

  init(context: GameContext): void {
    this.testImage = context.loadBitmap("assets/test.png");
    this.testTiles = context.loadTileset("assets/tiles.png", 8, 8);
    this.keySound = context.loadSound("assets/coin.mp3");
    this.mouseSound = context.loadSound("assets/jump.mp3");
    this.music = context.loadMusic("assets/music.mp3");

    this.music.play(1.0);
  }

  onMouseDown(context: GameContext, x: number, y: number): void {
    this.mouseSound.play(1.0);
  }

  onMouseUp(context: GameContext, x: number, y: number): void {
  }

  onKeyDown(context: GameContext, key: string): void {
    this.keySound.play(1.0);
  }

  onKeyUp(context: GameContext, key: string): void {
  }

  update(context: GameContext, delta: number): void {
  }

  render(context: GameContext, g: Graphics): void {
    g.fillRect(0,0,320,240,"black");

    if (context.allResourcesLoaded()) {
      g.drawBitmap(100, 100, this.testImage);
      g.drawBitmap(150, 100, this.testTiles.getTile(0));
    }
  }

}