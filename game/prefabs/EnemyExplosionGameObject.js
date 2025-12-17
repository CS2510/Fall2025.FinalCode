/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class EnemyExplosionGameObject extends GameObject{
    constructor(){
        super("Enemy Explosion Game Object")
        //Smoke
        this.addComponent(new ParticleSystem(), {
            startParticles: new UniformDistribution(1, 10),
            particleVelocity: new UniformDistribution(2, 6),
            particleLifetime: new UniformDistribution(1.5, 3),
            particleSize: new UniformDistribution(2, 4),
            particleColor: new UniformColorDistribution(255, 255, 255, 64, 64, 64)
        })
        //Fire
        this.addComponent(new ParticleSystem(), {
            startParticles: new UniformDistribution(10, 10),
            particleVelocity: new UniformDistribution(.9, 1),
            particleLifetime: new UniformDistribution(1.5, 2),
            particleSize: new UniformDistribution(3, 4),
            particleColor: new UniformColorDistribution(255, 0, 0, 255, 128, 0)
        })
    }
}