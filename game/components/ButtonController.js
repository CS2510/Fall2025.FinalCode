/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class ButtonController extends Component {
  update() {
    if (Input.mousePosition)
      if (Input.buttonsDownThisFrame.length > 0)
        if (Collisions.raycast(Input.mousePosition) == this.gameObject)
          SceneManager.loadScene(new MainScene())
  }

}