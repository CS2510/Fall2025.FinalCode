/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Polygon component.
 * This is main class for drawing in our engine (other that Text).
 * 
 * This class is meant to be a represent a simplified composition of the Renderer and Mesh classes
 * 
 * In order for a polygon to be drawn, it needs a fillStyle color and a list of Vector2 point.
 */
class Polygon extends Component {
    /**
     * The fill style of the polygon
     * @type {string}
     */
    fillStyle = "magenta"

    /**
     * The points that make up the polygon
     * @type {Vector2[]}
     */
    points = [new Vector2(0, -1), new Vector2(1, 1), new Vector2(-1, 1)]

    /**
     * Draw the polygon to the screen
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.fillStyle = this.fillStyle



        ctx.beginPath()
        for (const point of this.points) {
            ctx.lineTo(point.x, point.y)
        }
        ctx.fill()


    }
}