/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * The main engine class of our engine. It starts the game and runs the game loop.
 */
class Engine {

    /**
     * The list of default layers in our engine.
     * @type {string[]} 
     */
    static layers = ["", "UI"]

    static collisionLayers = [["", ""]]

    /**
     * The canvas element we will draw to
     * @type {HTMLCanvasElement}
     */
    static canvas

    /**
     * The 2D context we will draw to
     * @type {CanvasRenderingContext2D}
     */
    static ctx

    /**
     * @type {number} The timestamp in milliseconds the last time we got a requestAnimationFrame callback
     */
    static lastTimestamp = performance.now()

    static aspectRatio
    static effectiveScreenWidth
    static effectiveScreenHeight
    static letterBoxSize
    static letterBoxType

    /**
     * Start the game
     * @param {GameProperties} gameProperties Optional argument for specific game-specific properties
     */
    static start(gameProperties) {
        if (gameProperties) {
            Engine.layers.push(...gameProperties.layers)
            if (gameProperties.collisionLayers)
                Engine.collisionLayers = gameProperties.collisionLayers

            if (gameProperties.aspectRatio)
                Engine.aspectRatio = gameProperties.aspectRatio
        }

        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        addEventListener("mousedown", Input.mousedown)
        addEventListener("mouseup", Input.mouseup)
        addEventListener("mousemove", Input.mousemove)

        SceneManager.update()
        SceneManager.getActiveScene().start()
        requestAnimationFrame(Engine.gameLoop)
    }

    /**
     * Run the game loop. This update the various static classes, then updates the game objects and draw them.
     */
    static gameLoop(timestamp) {
        //Update Time.deltaTime based on the timestamp
        Time.deltaTime = (timestamp - Engine.lastTimestamp) / 1000
        Engine.lastTimestamp = timestamp

        SceneManager.update()
        Engine.update()
        Engine.draw()
        Input.update()
        Time.update()
        requestAnimationFrame(Engine.gameLoop)
    }

    /**
     * Update all the game objects in the scene
     */
    static update() {
        SceneManager.getActiveScene().update()
    }

    /**
     * Draw all the game objects in the scene
     */
    static draw() {


        const ctx = Engine.ctx
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        const screenAspectRatio = screenWidth / screenHeight


        Engine.canvas.width = screenWidth
        Engine.canvas.height = screenHeight

        Engine.letterBoxSize = 0
        Engine.letterBoxType = "None"
        Engine.effectiveScreenWidth = screenWidth
        Engine.effectiveScreenHeight = screenHeight

        //@ts-ignore Since this call results in a Camera component, we can set backgroundColor
        ctx.fillStyle = Camera.main.getComponent(Camera).backgroundColor
        ctx.beginPath()
        ctx.rect(0, 0, screenWidth, screenHeight)
        ctx.fill()

        if (Engine.aspectRatio) {
            ctx.save()
            if (screenAspectRatio > Engine.aspectRatio) {
                Engine.letterBoxSize = (screenWidth - Engine.aspectRatio * screenHeight) / 2
                ctx.translate(Engine.letterBoxSize, 0)
                Engine.effectiveScreenWidth -= Engine.letterBoxSize * 2
                Engine.letterBoxType = "Vertical"
            }
            else {
                //We need vertical letter boxes
                Engine.letterBoxSize = (Engine.aspectRatio * screenHeight - screenWidth) / Engine.aspectRatio / 2
                ctx.translate(0, Engine.letterBoxSize)
                Engine.effectiveScreenHeight -= Engine.letterBoxSize * 2
                Engine.letterBoxType = "Horizontal"
            }

        }

        SceneManager.getActiveScene().draw(Engine.ctx)

        if (Engine.aspectRatio)
            ctx.restore()

        if (Engine.aspectRatio) {
            ctx.fillStyle = "gray"


            if (Engine.letterBoxType == "Vertical") {
                //We need vertical letter boxes
                ctx.fillRect(0, 0, Engine.letterBoxSize, screenHeight)
                ctx.fillRect(screenWidth - Engine.letterBoxSize, 0, Engine.letterBoxSize, screenHeight)
            }
            else {
                //We need vertical letter boxes
                ctx.fillRect(0, 0, screenWidth, Engine.letterBoxSize)
                ctx.fillRect(0, screenHeight - Engine.letterBoxSize, screenWidth, Engine.letterBoxSize)
            }
        }
    }
}