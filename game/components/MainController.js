/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class MainController extends Component{
  wave = 0
  start(){
    //Create a star field
    // console.log("Hi")
    for(let i = 0; i < 100; i++){
      instantiate(new StarGameObject(), new Vector2((Math.random()*2-1)*1500, (Math.random()*2-1)*1000))
    }
  }
  update(){
    if(!GameObject.find("Enemy Game Object")){
      this.wave++
      for(let i = 0; i < this.wave; i++){
        instantiate(new EnemyGameObject(), new Vector2(i*20, i*20))
      }
    }

    //Cheat codes
    // console.log(Input.keysDownThisFrame)
    if(Input.keysDownThisFrame.includes("Delete"))
    {
      SceneManager.loadScene(new StartScene())
    }
  }
}