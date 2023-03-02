  
export interface IVectorOnChangeListener{
  ( ): any;
}
abstract class AChangeableVector{
 

  protected listeners : { [name : string ]: IVectorOnChangeListener} = {};
  public addListener(name:string, call : IVectorOnChangeListener ){
    this.listeners[name] = call;
  }
  public removeListener(name:string){
    delete this.listeners[name];
  }

  private onChange(){
    for( const key in this.listeners ){
      this.listeners[key]();
    }
  }

  public _data: number[];  
    public constructor(values: number[]) {
      this._data = values;
    }

  protected setAll(v:number[]){
    for (let i = 0; i < this._data.length; i++) {
        if( i >= v.length)
          this._data[i]=0;
        this._data[i] = v[i];
    }
    this.onChange();
  }

  protected set(i : number, v : number){
    this._data[i] = v;
    this.onChange();
  }
  protected get(i:number){
    return this._data[i]; 
  }

}
export class Vector extends AChangeableVector{

    public constructor(values: number[]) {
      super(values);
    }

    public get length(): number {
      return Math.sqrt(this.dot(this));
    }
  
    public get dimension(): number {
      return this._data.length;
    }

    public get values():number[]{
        return this._data;
    }
  
    add(other: Vector): Vector {
      if (this.dimension !== other.dimension) {
        throw new Error('Vectors must have the same dimension');
      }
      const result = [];
      for (let i = 0; i < this.dimension; i++) {
        result.push(this._data[i] + other._data[i]);
      }
      return new Vector(result);
    }
  
    subtract(other: Vector): Vector {
      if (this.dimension !== other.dimension) {
        throw new Error('Vectors must have the same dimension');
      }
      const result = [];
      for (let i = 0; i < this.dimension; i++) {
        result.push(this._data[i] - other._data[i]);
      }
      return new Vector(result);
    }
  
    scale(scalar: number): Vector {
      const result = [];
      for (let i = 0; i < this.dimension; i++) {
        result.push(this._data[i] * scalar);
      }
      return new Vector(result);
    }
  
    dot(other: Vector): number {
      if (this.dimension !== other.dimension) {
        throw new Error('Vectors must have the same dimension');
      }
      let result = 0;
      for (let i = 0; i < this.dimension; i++) {
        result += this._data[i] * other._data[i];
      }
      return result;
    }
  
    cross(other: Vector): Vector {
      if (this.dimension !== 3 || other.dimension !== 3) {
        throw new Error('Cross product is only defined for 3D vectors');
      }
      const [x1, y1, z1] = this._data;
      const [x2, y2, z2] = other._data;
      const result = [
        y1 * z2 - z1 * y2,
        z1 * x2 - x1 * z2,
        x1 * y2 - y1 * x2,
      ];
      return new Vector(result);
    }
  
    normalize(): Vector {
      const length = this.length;
      if (length === 0) {
        throw new Error('Cannot normalize a zero-length vector');
      }
      return this.scale(1 / length);
    }
    
    public SetTo(vector : Vector2){
      this.setAll(vector._data);
    }
  }

  export class Vector2 extends Vector{
    
    public get x(){return this.get(0);} public set x(v){this.set(0,v);}
    public get y(){return this.get(1);} public set y(v){this.set(1,v);} 
    
    public constructor(values: number[]) {
      const [x,y] = values;
      super([x,y]);
    }
    override add       (other: Vector) : Vector2 {return super.add(other)     as Vector2 ;}
    override subtract  (other: Vector) : Vector2 {return super.subtract(other)as Vector2 ;}
    override scale     (scalar: number): Vector2 {return super.scale(scalar)  as Vector2 ;}
    override cross     (other: Vector) : Vector2 {return super.cross(other)   as Vector2 ;}
    override normalize ()              : Vector2 {return super.normalize()    as Vector2 ;}

    public override SetTo(vector : Vector2){
      this.setAll(vector._data);
    }
  }

  export class Vector3 extends Vector{
    
    public get x(){return this.get(0);} public set x(v){this.set(0,v);}
    public get y(){return this.get(1);} public set y(v){this.set(1,v);}
    public get z(){return this.get(2);} public set z(v){this.set(2,v);}
    
    public constructor(values: number[]) {
      const [x,y,z] = values;
      super([x,y,z]);
    }
    override add       (other: Vector) : Vector3 {return super.add(other)     as Vector3 ;}
    override subtract  (other: Vector) : Vector3 {return super.subtract(other)as Vector3 ;}
    override scale     (scalar: number): Vector3 {return super.scale(scalar)  as Vector3 ;}
    override cross     (other: Vector) : Vector3 {return super.cross(other)   as Vector3 ;}
    override normalize ()              : Vector3 {return super.normalize()    as Vector3 ;}
    
    public override SetTo(vector : Vector3){
      this.setAll(vector._data);
    }
  }

  export class Vector4 extends Vector{
    
    public get x(){return this.get(0);} public set x(v){this.set(0,v);}
    public get y(){return this.get(1);} public set y(v){this.set(1,v);}
    public get z(){return this.get(2);} public set z(v){this.set(2,v);}
    public get c(){return this.get(3);} public set c(v){this.set(3,v);}
    
    public constructor(values: number[]) {
      const [x,y,z,c] = values;
      super([x,y,z,c]);
    }
    override add       (other: Vector) : Vector4 {return super.add(other)     as Vector4 ;}
    override subtract  (other: Vector) : Vector4 {return super.subtract(other)as Vector4 ;}
    override scale     (scalar: number): Vector4 {return super.scale(scalar)  as Vector4 ;}
    override cross     (other: Vector) : Vector4 {return super.cross(other)   as Vector4 ;}
    override normalize ()              : Vector4 {return super.normalize()    as Vector4 ;}

    public override SetTo(vector : Vector4){
      this.setAll(vector._data);
    }

  }

