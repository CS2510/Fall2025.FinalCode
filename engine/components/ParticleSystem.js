/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

class ConstantDistribution{
    constructor(value){
        this.value = value
    }
    sample(){
        return this.value
    }
}

class UniformDistribution{
    constructor(low, high){
        this.low = low
        this.high = high
    }
    sample(){
        return this.low + Math.random()*(this.high-this.low)
    }
}

class ConstantColorDistribution{
    constructor(r, g, b){
        this.r = r
        this.g = g
        this.b = b
    }
    sample(){
        return {r: this.r, g: this.g, b: this.b}
    }
}

class UniformColorDistribution{
    constructor(r, g, b, r2, g2, b2){
        Object.assign(this, {r, g, b, r2, g2, b2})
    }
    sample(){
        const rand = Math.random()
        return {
            r: (1-rand) * this.r + rand*this.r2,
            g: (1-rand) * this.g + rand*this.g2,
            b: (1-rand) * this.b + rand*this.b2,
        }
    }
}

class Particle {
    constructor(params){
        Object.assign(this, params)
        this.startTime = Time.time
    }
    update() {
        this.position.x += Math.cos(this.direction) * this.velocity
        this.position.y += Math.sin(this.direction) * this.velocity
        if(this.startTime + this.lifetime < Time.time){
            this.isDead = true
        }

    }
    getAlpha(){
        const percent = (Time.time - this.startTime)/(this.lifetime)
        return (1-percent) * this.startAlpha + percent*this.endAlpha

    }
    position = Vector2.zero
    velocity = 1
    direction = Math.random() * Math.PI * 2
    lifetime = 1
    size = 1
    startAlpha = 1
    endAlpha = 0
    color = {r: 255, g: 255, b: 255}
}


class ParticleSystem extends Component {
    particles = []
    startParticles = new ConstantDistribution(10)
    particleVelocity = new ConstantDistribution(1)
    particleLifetime = new ConstantDistribution(1)
    particleSize = new ConstantDistribution(1)
    particleColor = new ConstantColorDistribution(255, 255, 255)
    start() {
        for (let i = 0; i < this.startParticles.sample(); i++) {
            this.particles.push(
                new Particle({
                    velocity: this.particleVelocity.sample(),
                    lifetime: this.particleLifetime.sample(),
                    size: this.particleSize.sample(),
                    color: this.particleColor.sample(),
                })
            )
        }

    }
    update() {
        for (const particle of this.particles) {
            particle.update()
        }
        this.particles = this.particles.filter(p=>!p.isDead)
        if(this.particles.length <= 0)
            this.gameObject.destroy()

    }
    draw(ctx) {
        for (const particle of this.particles) {
            ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.getAlpha()})`
            ctx.beginPath()
            ctx.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
        }

    }

}