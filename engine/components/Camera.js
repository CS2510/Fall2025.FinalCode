/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Camera component class.
 * Each scene should have a camera game object with this component attached.
 * 
 * See https://docs.unity3d.com/ScriptReference/Camera.html
 */
class Camera extends Component{

    /**
     * The background color of the scene
     * See https://docs.unity3d.com/ScriptReference/Camera-backgroundColor.html
     * @type {string}
     */
    backgroundColor = "magenta"

    /**
     * Get the main camera game object in the scene
     * See https://docs.unity3d.com/ScriptReference/Camera-main.html
     * @type {CameraGameObject}
     */
    static get main(){
        return GameObject.find("Camera Game Object")
    }

    /**
     * Convert a screen space point to a world space point.
     * Compare to https://docs.unity3d.com/ScriptReference/Camera.ScreenToWorldPoint.html
     * 
     * @param {Vector2} screenSpace The screen space point to convert
     * @returns {Vector2} The world space point
     */
    static screenToWorldSpace(screenSpace){
        let screen  = new DOMPoint(screenSpace.x, screenSpace.y)
        let matrix = new DOMMatrix()
        matrix.translateSelf(window.innerWidth / 2, window.innerHeight / 2)
        matrix.translateSelf(-Camera.main.transform.position.x, -Camera.main.transform.position.y)
        let screenMatrix = matrix.inverse()
        let worldPoint = screenMatrix.transformPoint(screen)
        return new Vector2(worldPoint.x, worldPoint.y)
    }
}