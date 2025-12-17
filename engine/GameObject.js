/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Base class for all objects ín a scene.
 * 
 * See: https://docs.unity3d.com/ScriptReference/GameObject.html
 */

class GameObject {
    /**
     * The components inside this game object
     * See https://docs.unity3d.com/ScriptReference/GameObject.GetComponents.html
     * @type {Component[]}
     */
    components = []

    /**
     * Flag that tracks of this game object has started
     * @type {boolean}
     */
    hasStarted = false

    /**
     * Flag that tracks if this game object has been marked for deletion
     * Game objects that have been marked for delete are removed before the next update
     * You should not edit this directly. Instead call destroy()
     */
    markForDelete = false

    /**
     * The name of the game object
     * See https://docs.unity3d.com/ScriptReference/Object-name.html
     * @type {string}
     */
    name = "[NO NAME]"

    /**
     * The layer this game object is assigned to.
     * Unlike Unity, we reference layers by their string name, not their integer index
     * See https://docs.unity3d.com/ScriptReference/GameObject-layer.html
     * @type {string}
     */
    layer = ""

    tag = ""


    /**
     * 
     * @param {string} name The name of the game object
     * @param {object} options Option set of values to assign to this game object
     */
    constructor(name, options) {
        Object.assign(this, options)
        if (options?.layer == "UI")
            this.addComponent(new RectTransform())
        else
            this.addComponent(new Transform())
        this.name = name
    }

    /**
     * 
     * @param {string} name Name of the message to broadcast
     * @param {object[]} args A list of arguments to pass to the component function if it is found 
     * See https://docs.unity3d.com/ScriptReference/GameObject.BroadcastMessage.html
     */
    broadcastMessage(name, args) {
        for (const component of this.components) {
            if (component[name]) {
                component[name](...args)
            }
        }
    }

    /**
     * Start the game object.
     * You should not call this function. It is only used by the engine.
     */
    start() {
        this.broadcastMessage("start", [])
    }

    /**
     * Update the game object.
     * You should not call this function. It is only used by the engine.
     */
    update() {
        if (!this.hasStarted) {
            this.hasStarted = true
            this.start()
        }
        this.broadcastMessage("update", [])
    }

    /**
     * Draw the game object.
     * You should not call this function. It is only used by the engine.
     * @param {CanvasRenderingContext2D} ctx The context to which we are rendering
     */
    draw(ctx) {
        for (const component of this.components) {
            ctx.save()
            const worldMatrix = this.transform.getWorldMatrix()
            ctx.setTransform(ctx.getTransform().multiply(worldMatrix))
            component.draw(ctx)
            ctx.restore()
        }
    }

    /**
     * Add a component to this game object and set any parameters
     * Note: Parameter type includes `|*` to allow Text component despite naming conflict with DOM Text interface
     * @param {Component|*} component The component to add to the game object
     * @param {object} values Any values to assign to this component
     */
    addComponent(component, values) {
        this.components.push(component)
        component.gameObject = this
        Object.assign(component, values)
    }

    /**
     * The transform of the game object
     * See https://docs.unity3d.com/ScriptReference/GameObject-transform.html
     * @type {Transform}
     */
    get transform() {
        //@ts-ignore The first component is always a transform
        return this.components[0]
    }

    /**
     * Destroy this game object.
     * Unlike Unity, this is not a state function
     * See https://docs.unity3d.com/ScriptReference/Object.Destroy.html
     */
    destroy() {
        this.markForDelete = true
    }

    /**
     * Get a component of a certain type
     * See https://docs.unity3d.com/ScriptReference/GameObject.GetComponent.html
     * Note: Parameter and return types use `*` to allow Text component despite naming conflict with DOM Text interface
     * @template  {Component} T
     * @param {(new()=>T)|*} type 
     * @returns {*} The first component found on the game object that matches the given type
     */
    getComponent(type) {
        return this.components.find(go => go instanceof type)
    }

    /**
     * Find a game object of a certain name
     * @param {string} name 
     * @returns {GameObject} The first game object with a given name found in the current scene. 
     */
    static find(name) {
        return SceneManager.getActiveScene().gameObjects.find(go => go.name == name)
    }

    static findByTag(tag) {
        return SceneManager.getActiveScene().gameObjects.filter(go => go.tag == tag)
    }
}