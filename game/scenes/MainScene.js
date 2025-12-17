/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class MainScene extends Scene{
    constructor(){
        super()

        const cameraGameObject = new CameraGameObject()
        cameraGameObject.getComponent(Camera).backgroundColor = "black"
        this.instantiate(cameraGameObject)
       
        /** Create the invisible main controller */
        this.instantiate(new MainControllerGameObject())


        /** Create the characters */
        this.instantiate(new EnemyGameObject(), new Vector2(0,0))
        this.instantiate(new PlayerGameObject(), new Vector2(0, 300))

        /** UI */
        const textParent = new GameObject("Text Parent Game Object", {layer: "UI"})
        this.instantiate(textParent)
        textParent.transform.offsetMin = new Vector2(-100, -100)

        const score = this.instantiate(new ScoreGameObject(), new Vector2(0, 0))
        score.transform.setParent(textParent.transform)

        const highScore = this.instantiate(new HighScoreGameObject(), new Vector2(0, 30))
        highScore.transform.setParent(textParent.transform)
        highScore.transform.offsetMin = new Vector2(0, -30)

        const enemyCount = this.instantiate(new EnemyCountGameObject(), new Vector2(0, 60))
        enemyCount.transform.setParent(textParent.transform)
        enemyCount.transform.offsetMin = new Vector2(0, -60)
    }
}