/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class EnemyLaserGameObject extends GameObject{
  constructor(){
    super("Enemy Laser Game Object", {layer: "enemy-laser"})
    this.addComponent(new Polygon(), {points: GameAssets.square, fillStyle:"yellow"})
    this.addComponent(new EnemyLaserController())
    this.addComponent(new Collider())
    this.transform.scale = new Vector2(1, 5)

  }
}