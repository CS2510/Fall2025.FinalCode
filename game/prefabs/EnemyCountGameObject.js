/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class EnemyCountGameObject extends GameObject {
  constructor() {
    super("Enemy Count Game Object", { layer: "UI" })
    this.addComponent(new Text(), { text: "Enemy Count", fillStyle: "white" })
    this.addComponent(new EnemyCountController())
  }

}