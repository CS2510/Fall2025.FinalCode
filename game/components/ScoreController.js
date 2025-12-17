/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

//@ts-nocheck
class ScoreController extends Component{
    score = 0
    update(){
        this.gameObject.getComponent(Text).text = "Score: " + this.score
        if(GameGlobals.highScore < this.score){
            GameGlobals.highScore = this.score
            document.cookie = GameGlobals.highScore
        }
    }
}