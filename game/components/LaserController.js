/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class LaserController extends Component{
    start(){
        this.speed = -500
    }
    update(){
        this.transform.position.y += this.speed * Time.deltaTime

        if(this.transform.position.y < -10){
            this.gameObject.destroy()
        }
    }
}