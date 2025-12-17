/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class GameProperties{
    layers = ["foreground", "enemy", "laser", "player", "enemy-laser"]
    collisionLayers = [["player", "enemy"], ["laser", "enemy"], ["enemy-laser", "player"]]
    aspectRatio = 4/3

}