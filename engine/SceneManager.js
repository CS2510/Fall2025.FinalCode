/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Class that manages scenes and the current scenes in our engine.
 * 
 * See https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.html
 */
class SceneManager{
    /**
     * The current scene in the game.
     * See https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.GetActiveScene.html
     * @type {Scene}
     */
    static currentScene

    /**
     * If set, the scene that should be loaded on the next frame.
     * @type {Scene}
     */
    static nextScene


    /**
     * Update the active scene
     */
    static update(){
        if(SceneManager.nextScene){
            SceneManager.currentScene = SceneManager.nextScene
            SceneManager.nextScene = undefined
        }
    }
    /**
     * Load a new scene when we are done updating and drawing this frame
     * 
     * See https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html
     * 
     * @param {Scene} scene The scene to load on the next frame
     */
    static loadScene(scene){
        SceneManager.nextScene = scene
    }

    /**
     * Get the active scene.
     * 
     * See https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.GetActiveScene.html
     * 
     * @returns {Scene} The active scene
     */
    static getActiveScene(){
        return SceneManager.currentScene
    }
}