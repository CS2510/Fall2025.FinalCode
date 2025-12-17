/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class HighScoreTextController extends Component{
  update(){
    this.gameObject.getComponent(Text).text = "High Score: " + GameGlobals.highScore
  }
}