import { Bitmap, Game, Keys } from "gute/dist";
import { Graphics } from "gute/dist";
import { Font } from "gute/dist/Font";
import { GameContext } from "gute/dist/GameContext";
import { Sound } from "gute/dist/Sound";
import { Tileset } from "gute/dist/Tileset";
import { isTypeQueryNode } from "typescript";

const JUMP: number = 7;
const GRAVITY: number = 0.5;

export class TestGame implements Game {
  keySound!: Sound;
  mouseSound!: Sound;
  music!: Sound;
  musicStarted: boolean = false;
  font!: Font;

  run!: Tileset;
  idle!: Tileset;
  jump!: Tileset;
  terrain!: Tileset;
  bg!: Bitmap;

  anim: number = 0;
  left: boolean = false;
  right: boolean = false;
  flipped: boolean = false;

  vx: number = 0;
  vy: number = 0;
  x: number = 100;
  y: number = 100;
  onground: boolean = true;

  init(context: GameContext): void {
    this.run = context.loadTileset("assets/run.png", 32, 32);
    this.idle = context.loadTileset("assets/idle.png", 32, 32);
    this.jump = context.loadTileset("assets/jump.png", 32, 32);
    this.terrain = context.loadTileset("assets/terrain.png", 16, 16);
    this.bg = context.loadBitmap("assets/Gray.png");
    this.keySound = context.loadSound("assets/coin.mp3");
    this.mouseSound = context.loadSound("assets/jump.mp3");
    this.music = context.loadMusic("assets/music.mp3");
    this.music.play(1.0);
  }

  onMouseDown(context: GameContext, x: number, y: number): void {
    this.mouseSound.play(1.0);
    this.keySound.play(1.0);
  }

  onMouseUp(context: GameContext, x: number, y: number): void {
  }

  onKeyDown(context: GameContext, key: string): void {
    if (key === Keys.LEFT_KEY) {
      this.left = true;
    }
    if (key === Keys.RIGHT_KEY) {
      this.right = true;
    }
    if (key === Keys.UP_KEY) {
      if (this.onground) {
        console.log("JUMP");
        this.onground = false;
        this.vy = -JUMP;
      }
    }
  }

  onKeyUp(context: GameContext, key: string): void {
    if (key === Keys.LEFT_KEY) {
      this.left = false;
    }
    if (key === Keys.RIGHT_KEY) {
      this.right = false;
    }
  }

  update(context: GameContext, delta: number): void {
    this.vx = (this.left ? -1 : 0) + (this.right ? 1 : 0);

    if (!this.onground) {
      this.vy += GRAVITY;
      this.y += this.vy;
      if (this.y > 100) {
        this.y = 100;
        this.onground = true;
      }
    }

    this.x += this.vx;
    if (this.vx < 0) {
      this.flipped = true;
    }
    if (this.vx > 0) {
      this.flipped = false;
    }
  }

  render(context: GameContext, g: Graphics): void {
    this.anim++;

    if (context.allResourcesLoaded()) {
      // draw a tiled background
      for (let x = 0; x <= Math.floor(g.getWidth() / this.bg.width); x++) {
        for (let y = 0; y <= Math.floor(g.getHeight() / this.bg.height); y++) {
          g.drawBitmap(x * this.bg.width, y * this.bg.height, this.bg);
        }
      }
      // draw some floor
      for (let x = 0; x <= Math.floor(g.getWidth() / this.terrain.getTileWidth()); x++) {
        g.drawBitmap(x * this.terrain.getTileWidth(), 132, this.terrain.getTile(7));
        for (let y = 0; y < 10; y++) {
          g.drawBitmap(x * this.terrain.getTileWidth(), 148 + (y * 16), this.terrain.getTile(29));
        }
      }

      let animation: Tileset = this.idle;
      if (this.vx !== 0) {
        animation = this.run;
      }
      if (!this.onground) {
        animation = this.jump;
      }

      g.push();
      g.translate(this.x, this.y);
      if (this.flipped) {
        g.scale(-1, 1);
        g.translate(-32, 0);
      }
      g.drawBitmap(0, 0, animation.getTile(Math.floor(this.anim / 3) % animation.getTileCount()));

      g.pop();

      g.drawString(81, 13, "Gute Test Game", "black");
      g.drawString(80, 12, "Gute Test Game", "white");
    } else {
      g.fillRect(0, 0, 320, 200, "black");
    }
  }

}