/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class LaserGameObject extends GameObject{
    constructor(){
        super("Laser Game Object", {layer:"laser"})
        this.addComponent(new Polygon(), {fillStyle: "green", points:[new Vector2(-1, -1), new Vector2(-1, 1), new Vector2(1, 1), new Vector2(1, -1)]})
        this.addComponent(new LaserController())
        this.addComponent(new Collider())
        this.transform.scale = new Vector2(2, 5)
    }
}