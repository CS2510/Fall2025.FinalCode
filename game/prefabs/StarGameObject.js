/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class StarGameObject extends GameObject{
  constructor(){
    super("Star Game Object")
    this.addComponent(new Polygon(), {fillStyle: "white", points: [new Vector2(1, 0), new Vector2(0, -1), new Vector2(-1, 0), new Vector2(0, 1)]})
    this.addComponent(new StarController())
    this.transform.scale = new Vector2(5, 5)
  }
}