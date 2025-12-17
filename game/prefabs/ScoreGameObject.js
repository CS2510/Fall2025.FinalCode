/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class ScoreGameObject extends GameObject{
    constructor(){
        super("Score Game Object", {layer: "UI"})
        this.addComponent(new Text())
        this.addComponent(new ScoreController())
    }
}