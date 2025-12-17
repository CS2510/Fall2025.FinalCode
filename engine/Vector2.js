/* Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project */

/**
 * Represents a 2D vector (direction) or 2D position
 * 
 * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2.html
 */

class Vector2 {
    /**
   * The x component of the Vector
   * 
   * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-x.html
   *
   * @type {number}
   */
    x

    /**
   * The y component of the Vector
   * 
   * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-y.html
   *
   * @type {number}
   */
    y

    /**
   * Create a new vector
   * 
   * See https://docs.unity3d.com/6000.1/Documentation/ScriptReference/Vector2-ctor.html
   * 
   * @param {number} x The x coordinate of the vector
   * @param {number} y The y coordinate of the vector
   */
    constructor(x, y) {
        this.x = x
        this.y = y
    }


    /**
     * Get a new Vector2 with value 0,0
     * @type {Vector2}
     */
    static get zero() { return new Vector2(0, 0) }

    /**
     * Get a new Vector2 with value -1,0
     * @type {Vector2}
     */
    static get left() { return new Vector2(-1, 0) }

    /**
     * Get a new Vector2 with value 1,0
     * @type {Vector2}
     */
    static get right() { return new Vector2(1, 0) }

    /**
     * Get a new Vector2 with value 0,-1
     * @type {Vector2}
     */
    static get up() { return new Vector2(0, -1) }

    /**
     * Get a new Vector2 with value 0,1
     * @type {Vector2}
     */
    static get down() { return new Vector2(0, 1) }

    /**
     * Convert from a DOMPoint to a Vector2
     * @param {DOMPoint} DOMPoint The DOMPoint we are converting from
     * @returns {Vector2} A new Vector2 with the same x and y as the input DOMPoint
     */
    static fromDOMPoint(DOMPoint){
        return new Vector2(DOMPoint.x, DOMPoint.y)
    }

    /**
     * Convert from a Vector2 to a DOMPoint
     * @returns {DOMPoint}
     */
    toDOMPoint(){
        return new DOMPoint(this.x, this.y)
    }

    /**
     * Mutate ourself by adding another Vector2
     * @param {Vector2} other The Vector2 that we are adding to ourself
     */
    plusEquals(other) {
        this.x += other.x
        this.y += other.y
    }

    /**
     * Create a new vector that is the sum of this and the other vector
     * @param {Vector2} other The vector to which we are being added
     * @returns {Vector2} The result of the addition
     */
    plus(other){
        return new Vector2(this.x+other.x, this.y+other.y)
    }

    /**
     * Create a new vector that is the subtraction of this and the other vector
     * @param {Vector2} other The other vector
     * @returns {Vector2} The result of the subtraction
     */
    minus(other){
        return new Vector2(this.x - other.x, this.y - other.y)
    }

    /**
     * Create a new Vector2 that has the same x and y as this
     * @returns {Vector2} The new vector
     */
    clone(){
        return new Vector2(this.x, this.y)
    }

    /**
     * Create a new vector that is the result of multiplying each component of this by the scalar
     * @param {number} scalar The scalar
     * @returns {Vector2} The new vector
     */
    times(scalar){
        return new Vector2(this.x*scalar, this.y*scalar)
    }

    /**
     * Create a new vector that is the result of the component-wise multiplication of this and the other vector
     * @param {Vector2} other The other vector
     * @returns {Vector2} The new vector
     */
    scale(other){
        return new Vector2(this.x*other.x, this.y*other.y)
    }

    /**
     * Do the dot product between this and the other vector
     * @param {Vector2} other The other vector
     * @returns {number} The dot product
     */
    dot(other){
        return this.x*other.x+this.y*other.y
    }

    /**
     * Create a new Vector2 that is orthogonal to this.
     * Note that if this is (0,0), then the returned value is (0,0)
     * @returns {Vector2} An orthogonal vector
     */
    orthogonal(){
        return new Vector2(-this.y, this.x)
    }

    /**
     * Get the magnitude of the current vector
     * @type {number}
     */
    get magnitude(){
        return Math.sqrt(this.x**2+this.y**2)
    }

    /**
     * Create a new vector of length 1 in the same direction as this vector.
     * Note that if the vector has 0 length, this vector is cloned and returned.
     * @returns {Vector2} The normalized vector
     */
    normalize(){
        if(this.magnitude == 0) return this.clone()
        return new Vector2(this.x/this.magnitude, this.y/this.magnitude)
    }

    /**
     * Create a new vector that is rotated around the origin by the given number of radians
     * @param {number} radians The radians to rotate by
     * @returns {Vector2} The rotated vector
     */
    rotate(radians){
        const newAngle = radians + Math.atan2(this.y, this.x)
        return new Vector2(Math.cos(newAngle)*this.magnitude, Math.sin(newAngle)*this.magnitude)
    }
}