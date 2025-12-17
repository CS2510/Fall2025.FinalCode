/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Static class that manages keyboard and mouse input in our engine.
 * 
 * See https://docs.unity3d.com/ScriptReference/Input.html
 */
class Input {
    /**
     * The keys that are currently down
     * @type {string[]}
     */
    static keysDown = []

    /**
     * The keys that went down this frame
     * @type {string[]}
     */
    static keysDownThisFrame = []

    /**
     * The keys that went up this frame
     * @type {string[]}
     */
    static keysUpThisFrame = []

    /**
     * The mouse buttons that are currently down
     * @type {number[]}
     */
    static buttonsDown = []

    /**
     * The mouse buttons that went down this frame
     * @type {number[]}
     */
    static buttonsDownThisFrame = []

    /**
     * The mouse buttons that went up this frame
     * @type {number[]}
     */
    static buttonsUpThisFrame = []

    /**
     * The position of the mouse in screen space
     * @type {Vector2}
     */
    static mousePosition

    
    /**
     * Event called when a keyboard key goes down
     * @param {KeyboardEvent} event 
     */
    static keydown(event) {
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }
    }

    /**
     * Event called when a keyboard key goes up
     * @param {KeyboardEvent} event 
     */
    static keyup(event) {
        Input.keysDown = Input.keysDown.filter(k => k != event.code)
        Input.keysUpThisFrame.push(event.code)
    }

    /**
     * Event called when a mouse button goes down
     * @param {MouseEvent} event 
     */
    static mousedown(event) {
        if (!Input.buttonsDown.includes(event.button)) {
            Input.buttonsDown.push(event.button)
            Input.buttonsDownThisFrame.push(event.button)
        }
    }

    /**
     * Event called when a mouse button goes up
     * @param {MouseEvent} event 
     */
    static mouseup(event) {
        Input.buttonsDown = Input.buttonsDown.filter(b => b != event.button)
        Input.buttonsUpThisFrame.push(event.button)
    }

    /**
     * Event called when the mouse position changes
     * @param {MouseEvent} event 
     */
    static mousemove(event) {
        Input.mousePosition = new Vector2(event.clientX, event.clientY)
        if(Engine.letterBoxSize != 0){
            if(Engine.letterBoxType == "Vertical"){
                Input.mousePosition.x -= Engine.letterBoxSize
            }
            else{
                Input.mousePosition.y -= Engine.letterBoxSize
            }
        }
    }

    /**
     * Updates the state of the input class
     * Used to clear the state of this-frame lists
     */
    static update() {
        Input.keysDownThisFrame = []
        Input.keysUpThisFrame = []
        Input.buttonsDownThisFrame = []
        Input.buttonsUpThisFrame = []
    }
}