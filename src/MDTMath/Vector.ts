 // Matrix calc is copied and Modified from
 // https://github.com/Kapcash/ts-matrix/blob/master/src/Matrix.ts

interface VectorOnChangeListener {
    (): void;
}
 

export abstract class AVector{
 
    protected _values: number[];

    protected constructor(values?: number[]) {
        // Create matrix filled with 0 by default
        this._values = new Array<number>((values || [0]).length).fill(0);

        if (values) {
            this._values = values;
        }
    } 
    public abstract construct(values?:number[]) : AVector 
     
    get rows() {
        return this.values.length;
    }

    get values() {
        return this._values;
    }
 
    /**
     * Get a matrix value, from its position
     * @param row Matrix line, from 0 to `rows`
     */
    at(row: number): number {
        return this.values[row];
    }

    /**
     * Sets all matrix values to 0
     */
    reset(): void {
        this._values = this.values.fill(0);
    }
 
    /**
     * Check if two matrix are equals, value by value
     * @param mat The matrix against to check equality
     */
    equals(vec: AVector): boolean {
        return (this.rows === vec.rows)
            && this.values.reduce((eql: boolean, val, i) => eql && vec.at(i) === val, true);
    }

    /**
     * Negate all values of the vector (get the opposite sign)
     * @return A new vector whose all values have the opposed sign
     */
    negate(): AVector {
        return this.construct(this.values.map((val) => -val));
    }

    /** Get the length of the vector */
    length(): number {
        return Math.sqrt(this.squaredLength());
    }

    /** Get the squared length of the vector */
    squaredLength(): number {
        return this.dot(this);
    }

    /**
     * Add all vector values with the same position value of the operand vector
     * @param vector The operand vector
     * @throws Error if the two vectors don't have the same dimension
     * @return a new Vector with the result values
     */
    add(vector: AVector): AVector {
        if (this.rows !== vector.rows) throw new Error("Vectors don't have the same dimension!");
        return this.operateOnAllValues((val, i) => (val + vector.at(i)));
    }

    /**
     * Sunstract all vector values with the same position value of the operand vector
     * @param vector The operand vector
     * @throws Error if the two vectors don't have the same dimension
     * @return a new Vector with the result values
     */
    substract(vector: AVector): AVector {
        if (this.rows !== vector.rows) throw new Error("Vectors don't have the same dimension!");
        return this.operateOnAllValues((val, i) => (val - vector.at(i)));
    }

    /**
     * Multiply all vector values with the same position value of the operand vector
     * @param vector The operand vector
     * @throws Error if the two vectors don't have the same dimension
     * @return a new Vector with the result values
     */
    multiply(vector: AVector): AVector {
        if (this.rows !== vector.rows) throw new Error("Vectors don't have the same dimension!");
        return this.operateOnAllValues((val, i) => (val * vector.at(i)));
    }

    /**
     * Divide all vector values with the same position value of the operand vector
     * Be aware of divisions by 0!
     * @param vector The operand vector
     * @throws Error if the two vectors don't have the same dimension
     * @return a new Vector with the result values
     */
    divide(vector: AVector): AVector {
        if (this.rows !== vector.rows) throw new Error("Vectors don't have the same dimension!");
        return this.operateOnAllValues((val, i) => {
            if (vector.at(i) === 0) return val;
            return (val / vector.at(i));
        });
    }

    /**
     * Multiply all vector values by the given number
     * @param scale The number to multiply with the values
     */
    scale(scale: number): AVector {
        return this.operateOnAllValues((val) => (val * scale));
    }

    /**
     * Run a function on all vector values, as a map.
     * @param operation The mapping method
     * @return a new Vector with the operation done on all its values
     */
    private operateOnAllValues(operation: (val: number, index: number) => number): AVector {
        return this.construct(this.values.map(operation));
    }

    /**
     * Computes the normalized vector
     * @return The normalized vector
     */
    normalize(): AVector {
        const vectorLength = this.length();
        return this.operateOnAllValues((val) => val / vectorLength);
    }

    /**
     * Computes the dot product of vectors
     * @param vector The operand vector
     */
    dot(vector: AVector): number {
        return this.values.reduce((res, val, i) => res + (val * vector.at(i)), 0);
    }

    /**
     * Computes the cross product of vectors
     * @param vector The operand vector
     */
    cross(vector: AVector): AVector {
        if (this.rows < 3 || vector.rows < 3) throw new Error('Cross product is possible on 3D vectors only');
        const crossValues = new Array<number>(3);
        crossValues[0] = this.at(1) * vector.at(2) - this.at(2) * vector.at(1);
        crossValues[1] = this.at(2) * vector.at(0) - this.at(0) * vector.at(2);
        crossValues[2] = this.at(0) * vector.at(1) - this.at(1) * vector.at(0);
        return this.construct(crossValues);
    }
   
} 
export class Vector extends AVector{

    public construct(values?: number[]): Vector {
        return new Vector(values);
    }

    protected constructor(values?: number[]) {
       super(values);
    }
    /**
     * Add an new row to the matrix, filled with 0
     */
    addAValue(): Vector {
        this.values.push(0);
        return this.construct(this.values);
    }

} 
export abstract class indexedVector extends AVector{
      /** Values of the vector */
      protected listeners : ( VectorOnChangeListener )[] = [];
      public addListener( listener : VectorOnChangeListener){
  
      }
      public callListeners(){
          if(this.listeners.length != 0){
              this.listeners.forEach( (listener) => {
                  listener.call(null);
              })
          }
      }
} 
export class Vector2  extends indexedVector{
    
    public override construct(values?: number[]): Vector2 {
        return new Vector2(values);
    } 
    constructor(values?: number[]) {
       super([values[0],values[1]]);
    }
     
    public get x () {
        return this._values[0];
    }
    public set x (value:number) {
        this._values[0] = value;
        this.callListeners();
    }

    public get y () {
        return this._values[1];
    }
    public set y (value: number) {
        this._values[1] = value;
        this.callListeners();
    } 
}
export class Vector3 extends Vector2{
    public override construct(values?: number[]): Vector3 {
        return new Vector3(values);
    } 
    constructor(values?: number[]) {
        super([values[0],values[1],values[2]]);
    }

    public get z () {
        return this._values[2];
    }

    public set z (value: number) {
        this._values[2] = value;
        this.callListeners();
    } 
}
export class Vector4 extends Vector3{
   public override construct(values?: number[]): Vector4 {
        return new Vector4(values);
    } 
    constructor(values?: number[]) {
        super([values[0],values[1],values[2],values[3]]);
    }
    
    public get c () {
        return this._values[3];
    }
    public set c (value: number) {
        this._values[3] = value;
        this.callListeners();
    }
}