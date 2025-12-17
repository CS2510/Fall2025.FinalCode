/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class MainControllerGameObject extends GameObject{
  constructor(){
    super("Main Controller Game Object")
    this.addComponent(new MainController())
  }
}