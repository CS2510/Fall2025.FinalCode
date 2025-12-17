/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class EnemyGameObject extends GameObject{
    constructor(){
        super('Enemy Game Object', {layer: "enemy", tag:"enemy"})
        this.addComponent(new EnemyController())

        const fireSequence = new BTSequence([new BTDuration(2), new BTFire()])

        const shouldMoveRightSequence = new BTSequence([new BTShouldMoveRight(), new BTMoveRight])
        const shouldMoveLeftSequence = new BTSequence([new BTShouldMoveLeft(), new BTMoveLeft])
        
        const parallelMoveRight = new BTParallel(new BTDuration(1), new BTMoveRight())
        const parallelMoveLeft = new BTParallel(new BTDuration(1), new BTMoveLeft())
        
        const hoverSequence = new BTSequence([parallelMoveRight, parallelMoveLeft])

        const hoverAndFireParallel = new BTParallel(hoverSequence,fireSequence)

        const movementSelector = new BTSelector([shouldMoveRightSequence, shouldMoveLeftSequence, hoverAndFireParallel])


        this.addComponent(new BehaviorTree(), {node: new BTRepeater(movementSelector)})
        this.addComponent(new Polygon(), {fillStyle: "blue"})
        this.addComponent(new Collider())
        this.transform.scale = new Vector2(15, 15)
    }
}

class BTMoveRight{
    update(tree){
        tree.gameObject.transform.position.x += Time.deltaTime * 50
        return BehaviorTree.SUCCEEDED
    }
}
class BTMoveLeft{
    update(tree){
        tree.gameObject.transform.position.x -= Time.deltaTime * 50
        return BehaviorTree.SUCCEEDED
    }
}

class BTShouldMoveRight{
    update(tree){
        if(tree.gameObject.transform.position.x < GameObject.find("Player Game Object").transform.position.x - 50)
            return BehaviorTree.SUCCEEDED
        return BehaviorTree.FAILED
    }
}

class BTShouldMoveLeft{
    update(tree){
        if(tree.gameObject.transform.position.x > GameObject.find("Player Game Object").transform.position.x + 50)
            return BehaviorTree.SUCCEEDED
        return BehaviorTree.FAILED
    }
}

class BTFire{
    update(tree){
        instantiate(new EnemyLaserGameObject(), tree.gameObject.transform.position.clone())
        return BehaviorTree.SUCCEEDED
    }
}