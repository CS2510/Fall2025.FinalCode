/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class EnemyController extends Component {
    startPosition
    swayWidth = 100
    speed = 60
    fireCoolDown = 1
    // start() {
    //     this.velocity = new Vector2(this.speed * Time.deltaTime, 0)
    //     this.startPosition = this.transform.position.clone() // Store the start position so I can move back and forth around that spot
    //     this.nextFire = Time.time + this.fireCoolDown
    // }
    // update() {
    //     this.transform.position.plusEquals(this.velocity)

    //     if (this.transform.position.x > this.startPosition.x + this.swayWidth || this.transform.position.x < this.startPosition.x - this.swayWidth) {
    //         this.velocity.x *= -1
    //     }
    //     if(Time.time > this.nextFire){
    //         this.nextFire = Time.time + this.fireCoolDown
    //         instantiate(new EnemyLaserGameObject(), this.transform.position.clone())

    //     }
       
    // }
    onCollisionEnter(other) {
        if (other.name == "Laser Game Object"){
            this.gameObject.destroy()
            instantiate(new EnemyExplosionGameObject(), this.transform.position.clone())
            GameObject.find("Score Game Object").getComponent(ScoreController).score ++ 
        }
    }
}