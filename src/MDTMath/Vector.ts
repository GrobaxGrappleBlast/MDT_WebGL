  
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

abstract class AVector<T extends Vector> extends AChangeableVector{
  protected get _x(){return this.get(0);} protected set _x(v){this.set(0,v);}
  protected get _y(){return this.get(1);} protected set _y(v){this.set(1,v);}
  protected get _z(){return this.get(2);} protected set _z(v){this.set(2,v);}
  protected get _c(){return this.get(3);} protected set _c(v){this.set(3,v);}

  public constructor(values: number[]) {
    super(values);
  }

  public abstract _constructor(values: number[]): T ;
}
export abstract class Vector extends AVector<Vector> {

  public get length(): number {
    return Math.sqrt(this._data.reduce((sum, value) => sum + value * value, 0));
  }

  public get dimension(): number {
    return this._data.length;
  }

  public get values():number[]{
      return this._data;
  }

  public add(other: Vector): Vector {
    if (this.dimension !== other.dimension) {
      throw new Error('Vectors must have the same dimension');
    }
    const result = [];
    for (let i = 0; i < this.dimension; i++) {
      result.push(this._data[i] + other._data[i]);
    }
    return this._constructor(result);
  }

  public subtract(other: Vector): Vector {
    if (this.dimension !== other.dimension) {
      throw new Error('Vectors must have the same dimension');
    }
    const result = [];
    for (let i = 0; i < this.dimension; i++) {
      result.push(this._data[i] - other._data[i]);
    }
    return this._constructor(result);
  }

  public dot(other: Vector): number {
    if (this.dimension !== other.dimension) {
      throw new Error('Vectors must have the same dimension');
    }
    let result = 0;
    for (let i = 0; i < this.dimension; i++) {
      result += this._data[i] * other._data[i];
    }
    return result;
  }

  public cross(other: Vector): Vector {
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
    return this._constructor(result);
  }

  public normalize(): void { 
    const magnitude = Math.sqrt( this.length );
    this._data.map(value => value / magnitude);
  }

  public scale(scalar: number): void {
    const result = [];
    for (let i = 0; i < this.dimension; i++) {
      result.push(this._data[i] * scalar);
    }

    this._data = result;
  }

  public SetTo(vector : Vector){
    this.setAll(vector._data);
  }

  public override toString (){
    var str = "{"
    for (let i = 0; i < this.dimension; i++) {
        if( i != 0 )
          str += ",";
        str += this._data[i] 
    }
    return str + "}"
  }
  
}

export class Vector2 extends Vector{
 
  
  public get x(){return this._x;} public set x(v){ this._x = v;}
  public get y(){return this._y;} public set y(v){ this._y = v;} 
  
  public constructor(values: number[]) {
    const [x,y] = values;
    super([x,y]);
  }

  public override _constructor(values: number[]): Vector2 { 
    return new Vector2(values);
  }
  
  override add       (other: Vector) : Vector2 {return super.add(other)     as Vector2 ;}
  override subtract  (other: Vector) : Vector2 {return super.subtract(other)as Vector2 ;}
  override scale     (scalar: number): void    {       super.scale(scalar) ;            }
  override cross     (other: Vector) : Vector2 {return super.cross(other)   as Vector2 ;}
  override normalize ()              : void    {       super.normalize()               ;}

  public override SetTo(vector : Vector2){
    this.setAll(vector._data);
  }
}

export class Vector3 extends Vector{
  
  public get x(){return this._x;} public set x(v){this._x = v;}
  public get y(){return this._y;} public set y(v){this._y = v;}
  public get z(){return this._z;} public set z(v){this._z = v;}
  
  public constructor(values: number[]) {
    const [x,y,z] = values;
    super([x,y,z]);
  }

  public override _constructor(values: number[]): Vector3 { 
    return new Vector3(values);
  }

  override add       (other: Vector) : Vector3 {return super.add(other)     as Vector3 ;}
  override subtract  (other: Vector) : Vector3 {return super.subtract(other)as Vector3 ;}
  override scale     (scalar: number): void    {       super.scale(scalar)             ;}
  override cross     (other: Vector) : Vector3 {return super.cross(other)   as Vector3 ;}
  override normalize ()              : void    {       super.normalize()               ;}
  
  public override SetTo(vector : Vector3){
    this.setAll(vector._data);
  }
}

export class Vector4 extends Vector{
  
  public get x(){return this._x;} public set x(v:number){this._x = v;}
  public get y(){return this._y;} public set y(v:number){this._y = v;}
  public get z(){return this._z;} public set z(v:number){this._z = v;}
  public get c(){return this._c;} public set c(v:number){this._c = v;}
  
  public constructor(values: number[]) {
    const [x,y,z,c] = values;
    super([x,y,z,c]);
  }
  
  public override _constructor(values: number[]): Vector4 { 
    return new Vector4(values);
  }

  public override add       (other: Vector) : Vector4 {return super.add(other)     as Vector4 ;}
  public override subtract  (other: Vector) : Vector4 {return super.subtract(other)as Vector4 ;}
  public override cross     (other: Vector) : Vector4 {return super.cross(other)   as Vector4 ;}
  public override scale     (scalar: number): void    {       super.scale(scalar);             }
  public override normalize ()              : void    {       super.normalize();               }

  public override SetTo(vector : Vector4){
    this.setAll(vector._data);
  }

}

