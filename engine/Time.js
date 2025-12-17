/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Class that manages time in our engine.
 * 
 * See https://docs.unity3d.com/ScriptReference/Time.html
 */

class Time{
    /**
     * The time that has elapsed since our last frame started
     * See https://docs.unity3d.com/ScriptReference/Time-deltaTime.html
     * @type {number}
     */
    static deltaTime = 1/60

    static time = 0

    static frames = 0

    static update(){
        Time.time += Time.deltaTime
        Time.frames++
    }
}