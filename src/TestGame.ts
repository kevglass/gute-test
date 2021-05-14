import { Bitmap, Game } from "gute/dist";
import { Graphics } from "gute/dist";
import { GameContext } from "gute/dist/GameContext";
import { Tileset } from "gute/dist/Tileset";

export class TestGame implements Game {
  testImage!: Bitmap;
  testTiles!: Tileset;
  
  init(context: GameContext): void {
    this.testImage = context.loadBitmap("test.png");
    this.testTiles = context.loadTileset("tiles.png", 8, 8);
  }

  onMouseDown(context: GameContext, x: number, y: number): void {
  }

  onMouseUp(context: GameContext, x: number, y: number): void {
  }

  onKeyDown(context: GameContext, key: string): void {
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