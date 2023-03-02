  
  export class Vector {

    protected _datavalues: number[];
  
    public constructor(values: number[]) {
      this._datavalues = values;
    }

    public get length(): number {
      return Math.sqrt(this.dot(this));
    }
  
    public get dimension(): number {
      return this._datavalues.length;
    }

    public get values():number[]{
        return this._datavalues;
    }
  
    add(other: Vector): Vector {
      if (this.dimension !== other.dimension) {
        throw new Error('Vectors must have the same dimension');
      }
      const result = [];
      for (let i = 0; i < this.dimension; i++) {
        result.push(this._datavalues[i] + other._datavalues[i]);
      }
      return new Vector(result);
    }
  
    subtract(other: Vector): Vector {
      if (this.dimension !== other.dimension) {
        throw new Error('Vectors must have the same dimension');
      }
      const result = [];
      for (let i = 0; i < this.dimension; i++) {
        result.push(this._datavalues[i] - other._datavalues[i]);
      }
      return new Vector(result);
    }
  
    scale(scalar: number): Vector {
      const result = [];
      for (let i = 0; i < this.dimension; i++) {
        result.push(this._datavalues[i] * scalar);
      }
      return new Vector(result);
    }
  
    dot(other: Vector): number {
      if (this.dimension !== other.dimension) {
        throw new Error('Vectors must have the same dimension');
      }
      let result = 0;
      for (let i = 0; i < this.dimension; i++) {
        result += this._datavalues[i] * other._datavalues[i];
      }
      return result;
    }
  
    cross(other: Vector): Vector {
      if (this.dimension !== 3 || other.dimension !== 3) {
        throw new Error('Cross product is only defined for 3D vectors');
      }
      const [x1, y1, z1] = this._datavalues;
      const [x2, y2, z2] = other._datavalues;
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
  }
  