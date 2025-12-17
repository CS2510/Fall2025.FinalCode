/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class PlayerGameObject extends GameObject{
    constructor(){
        super("Player Game Object", {layer:"player", tag:"player"})
        this.addComponent(new PlayerController())
        this.addComponent(new Polygon(), {fillStyle:"red"})
        this.addComponent(new Collider())
        this.transform.scale = new Vector2(20, 20)
    }

    
}