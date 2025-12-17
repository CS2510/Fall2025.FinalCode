/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Rigid Body component.
 * Any game object with a rigid body attached will respond to collisions by preventing collisions.
 * 
 * See https://docs.unity3d.com/ScriptReference/Rigidbody.html
 */
class RigidBody extends Component{

    /**
     * @type {Vector2} The instantaneous velocity of the game object
     */
    velocity = Vector2.zero

    /**
     * @type {Vector2} The instantaneous acceleration of the game object
     */
    acceleration = Vector2.zero

    /**
     * @type {Vector2} The gravity that will be applied every frame to this game object
     */
    gravity = Vector2.zero

    update(){
        this.velocity.plusEquals(this.acceleration.times(Time.deltaTime))
        this.velocity.plusEquals(this.gravity.times(Time.deltaTime))
        this.transform.position.plusEquals(this.velocity.times(Time.deltaTime))
    }
}