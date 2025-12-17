/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class StartScene extends Scene{
    constructor(){
        super()

        /* The camera */
        const camera = new CameraGameObject()
        camera.getComponent(Camera).backgroundColor = "orange"
        this.instantiate(camera)


        /* The main text */
        const textParent = new GameObject("Text Parent Game Object", {layer: "UI"})
        this.instantiate(textParent)
        textParent.transform.offsetMin = new Vector2(-100, -100)

        

        const titleText = new GameObject("Title Text Game Object", {layer: "UI"})
        titleText.addComponent(new Text(), {fillStyle: "white", text: "Galaxy Guardians"})
        this.instantiate(titleText)
        titleText.transform.setParent(textParent.transform)

        const highScoreText = new HighScoreGameObject()
        this.instantiate(highScoreText)
        highScoreText.transform.setParent(textParent.transform)
        highScoreText.transform.offsetMin = new Vector2(0, -50)

        

        /* The button */

        const buttonParent = new GameObject("Button Parent Game Object", {layer: "UI"})
        this.instantiate(buttonParent)
        buttonParent.transform.offsetMin = new Vector2(-200, -200)

        const button = new GameObject("Start Button Game Object", {layer:"UI"})
        button.addComponent(new Polygon, {fillStyle: "blue", points:GameAssets.uiSquare})
        button.addComponent(new ButtonController())
        button.addComponent(new Collider())
        button.transform.scale = new Vector2(100, 20)
        this.instantiate(button)
        button.transform.setParent(buttonParent.transform)
        button.transform.anchorMax = Vector2.zero
        button.transform.offsetMin = new Vector2(100, 20)
        button.transform.offsetMax = new Vector2(100, 20)

        const startText = new GameObject("Start Text Game Object", {layer:"UI"})
        startText.addComponent(new Text(), {text: "Start Game", fillStyle:"white", textAlign: "center", textBaseline:"middle"})
        this.instantiate(startText, new Vector2(0, 0))
        startText.transform.setParent(buttonParent.transform)


        
        /* The controller */

        const startSceneControllerGameObject = new GameObject("Start Scene Controller Game Object")
        startSceneControllerGameObject.addComponent(new StartSceneController())
        this.instantiate(startSceneControllerGameObject)

        /* Rect Transform*/
        const rectangle = new GameObject("Rectangle", {layer:"UI"})
        rectangle.addComponent(new Polygon(), {fillStyle: "white", points: GameAssets.uiSquare})
        this.instantiate(rectangle)
        rectangle.transform.anchorMin = new Vector2(1, 1)
        rectangle.transform.anchorMax = new Vector2(1, 1)
        rectangle.transform.offsetMin = new Vector2(100, 100)
        rectangle.transform.offsetMax = new Vector2(0, 0)

        /* Rect Transform Child */
        const childRectangle = new GameObject("Rectangle Child Game Object", {layer: "UI"})
        childRectangle.addComponent(new Polygon(), {fillStyle: "black", points: GameAssets.uiSquare})
        this.instantiate(childRectangle)
        childRectangle.transform.setParent(rectangle.transform)
        childRectangle.transform.anchorMin = new Vector2(0, 0)
        childRectangle.transform.anchorMax = new Vector2(1, 1)
        childRectangle.transform.offsetMin = new Vector2(-10, -10)
        childRectangle.transform.offsetMax = new Vector2(-10, -10)

        const grandchildRectangle = new GameObject("Grandchild Rectangle", {layer: "UI"})
        grandchildRectangle.addComponent(new Polygon(), {fillStyle: "gray", points: GameAssets.uiSquare})
        this.instantiate(grandchildRectangle)
        grandchildRectangle.transform.setParent(childRectangle.transform)
        grandchildRectangle.transform.anchorMin = new Vector2(0, 0)
        grandchildRectangle.transform.anchorMax = new Vector2(.5, .5)
        grandchildRectangle.transform.offsetMin = new Vector2(10, 10)
        grandchildRectangle.transform.offsetMax = new Vector2(0, 0)



        
    }
}