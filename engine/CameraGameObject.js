/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * The camera game object that should be in every scene
 */
class CameraGameObject extends GameObject{
    constructor(){
        super("Camera Game Object")
        this.addComponent(new Camera())
    }
}