/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Base class for all scenes
 * 
 * See https://docs.unity3d.com/ScriptReference/SceneManagement.Scene.html
 */

class Scene {
    /**
     * List of game objects in the scene
     * See https://docs.unity3d.com/ScriptReference/SceneManagement.Scene.GetRootGameObjects.html
     * @type {GameObject[]}
     */
    gameObjects = []

    /**
     * Start the game objects in the scene
     */
    start() {
        for (const gameObject of this.gameObjects) {
            gameObject.start()
            gameObject.hasStarted = true
        }
    }

    /**
     * Update the game objects in the scene
     * This includes handling physics and removing game objects
     */
    update() {

        //Update everything
        for (const gameObject of this.gameObjects) {
            //Start if the gameObject hasn't started yet
            if (!gameObject.hasStarted) {
                gameObject.start()
                gameObject.hasStarted = true
            }
            gameObject.update()
        }

        //Do Collision Detection
        for (const collisionLayer of Engine.collisionLayers) {


            const gameObjectsWithCollidersA = this.gameObjects.filter(go => go.getComponent(Collider) && go.layer == collisionLayer[0])
            const gameObjectsWithCollidersB = this.gameObjects.filter(go => go.getComponent(Collider) && go.layer == collisionLayer[1])
            for (let i = 0; i < gameObjectsWithCollidersA.length; i++) {
                for (let j = 0; j < gameObjectsWithCollidersB.length; j++) {

                    let a = gameObjectsWithCollidersA[i]
                    let b = gameObjectsWithCollidersB[j]

                    if(a == b) continue

                    let response = Collisions.inCollision(a, b)
                    if (response) {

                        const aHasRigidBody = a.getComponent(RigidBody)
                        const bHasRigidBody = b.getComponent(RigidBody)
                        if (aHasRigidBody) {
                            if (a.transform.position.minus(b.transform.position).dot(response) < 0)
                                response = response.times(-1)
                            a.transform.position.plusEquals(response)
                        }
                        if (bHasRigidBody) {
                            if (b.transform.position.minus(a.transform.position).dot(response) < 0)
                                response = response.times(-1)
                            b.transform.position.plusEquals(response)
                        }



                        for (const component of a.components) {
                            //@ts-ignore The optional chaining operator takes care of this potential error
                            component.onCollisionEnter?.(b)
                        }
                        for (const component of b.components) {
                            //@ts-ignore The optional chaining operator takes care of this potential error
                            component.onCollisionEnter?.(a)
                        }
                    }
                }
            }
        }

        //Delete what needs to be removed
        this.gameObjects = this.gameObjects.filter(go => !go.markForDelete)
    }

    /**
     * Draw all the game objects to the screen
     * @param {CanvasRenderingContext2D} ctx The context to which we are drawing
     */
    draw(ctx) {
        ctx.save()

        //Handle the camera transforms
        ctx.translate(Engine.effectiveScreenWidth / 2, Engine.effectiveScreenHeight / 2)
        ctx.scale(Camera.main.transform.scale.x, Camera.main.transform.scale.y)
        ctx.translate(-Camera.main.transform.position.x, -Camera.main.transform.position.y)

        //Draw everything that is not part of the UI
        for (const layer of Engine.layers.filter(l => l != "UI")) {
            const gameObjects = this.gameObjects.filter(go => go.layer == layer)
            for (const gameObject of gameObjects) {
                gameObject.draw(ctx)
            }
        }

        ctx.restore()

        //Handle the UI
        const gameObjects = this.gameObjects.filter(go => go.layer == "UI" )
        for (const gameObject of gameObjects) {
            gameObject.draw(ctx)
        }
    }

    /**
     * Instantiate a new game object in the scene.
     * This function should only be called in the constructor of classes that descend from the Scene class.
     * When creating new game objects in components, call the static version
     * 
     * @param {GameObject} gameObject The game object to instantiate
     * @param {Vector2} [position] The position of the game object to instantiate
     * @returns {GameObject} The created game object
     */
    instantiate(gameObject, position) {
        this.gameObjects.push(gameObject)
        if (position)
            gameObject.transform.position = position
        return gameObject
    }
}

/**
 * Instantiate a new game object in the current scene.
 * 
 * See https://docs.unity3d.com/6000.2/Documentation/ScriptReference/Object.Instantiate.html
 * 
 * @param {GameObject} gameObject The game object to add to the current scene
 * @param {Vector2} position The position of the game object
 * @returns {GameObject} The created game object
 */
function instantiate(gameObject, position) {
    return SceneManager.getActiveScene().instantiate(gameObject, position)
}