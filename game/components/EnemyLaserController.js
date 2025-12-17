/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class EnemyLaserController extends Component{
  update(){
    this.transform.position.y += Time.deltaTime * 50
    if(this.transform.position.y > 1000)
      this.gameObject.destroy()
  }
  onCollisionEnter(){
    this.gameObject.destroy()
    console.log("Enemy Laser Collision")
  }
}