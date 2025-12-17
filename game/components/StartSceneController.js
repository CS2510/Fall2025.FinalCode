/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class StartSceneController extends Component{
    start(){
        this.time = 0

        //Example of how to use cookies to persist data across sessions
        if(document.cookie){
            const score = parseInt(document.cookie)
            if(score > GameGlobals.highScore)
                GameGlobals.highScore = score
        }
        document.cookie = "" + GameGlobals.highScore

        //Example of how to read data from an external file
        // fetch("./game/data.json")
        // .then(result=>result.json())
        // .then(json=>console.log(json))
    }
    update(){
        this.time += Time.deltaTime

        // if(Input.keysDown.length > 0){
        //     SceneManager.loadScene(new MainScene())
        // }
    }
}