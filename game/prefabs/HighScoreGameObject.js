/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class HighScoreGameObject extends GameObject {
  constructor() {
    super("High Score Game Object", { layer: "UI" })
    this.addComponent(new Text(), { text: "High Score", fillStyle: "white" })
    this.addComponent(new HighScoreTextController())
  }

}