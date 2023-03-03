import { Vector } from "./Vector";

 

 
export class Matrix {
    
    protected _data: number[][];
    protected numRows: number;
    protected numCols: number;
  
    public set(row: number, col: number, value: number): void {
        this._data[row][col] = value;
    }
    
    public get(row: number, col: number): number {
        return this._data[row][col];
    }

    constructor(rows: number[][]) {
      this._data = rows;
      this.numRows = rows.length;
      this.numCols = rows[0].length;
    }
  
    public getData(): number[][] {
      return this._data;
    }
    public getDataArray(): number[] {
        return this._data.flat();
      }
  
    public getNumRows(): number {
      return this.numRows;
    }
  
    public getNumCols(): number {
      return this.numCols;
    }
  
    public transpose(): Matrix {
      const transposedRows: number[][] = [];
      for (let j = 0; j < this.numCols; j++) {
        const newRow: number[] = [];
        for (let i = 0; i < this.numRows; i++) {
          newRow.push(this._data[i][j]);
        }
        transposedRows.push(newRow);
      }
      return new Matrix(transposedRows);
    }
  
    public multiply(other: Matrix | Vector): Matrix | Vector {
      if (other instanceof Vector) {
        
        return this.mutliplyVektor(other);
      } else {
        // Matrix-matrix multiplication
        const otherTranspose: Matrix = other.transpose();
        const resultRows: number[][] = [];
        for (let i = 0; i < this.numRows; i++) {
          const resultRow: number[] = [];
          for (let j = 0; j < otherTranspose.numRows; j++) {
            const dotProduct = this.dotProduct(this._data[i], otherTranspose._data[j]);
            resultRow.push(dotProduct);
          }
          resultRows.push(resultRow);
        }
        return new Matrix(resultRows);
      }
    }
  
    private mutliplyVektor(other:Vector):Vector{

        let values = other.values;
        if(this.numCols != other.length){
            
            let n = new Array<number>();
            for (let i = 0; i < this.numCols; i++) {
                n.push(values[i] || 0);
            }
            values = n;
        }
 
        // Matrix-vector multiplication
        const result: number[] = [];
        for (let i = 0; i < this.numRows; i++) {
          let dotProduct = 0;
          for (let j = 0; j < this.numCols; j++) {
            dotProduct += this._data[i][j] * values[j];
          }
          result.push(dotProduct);
        }
        return new Vector(result);
    } 
    
    protected dotProduct(vec1: number[], vec2: number[]): number {
      let result = 0;
      for (let i = 0; i < vec1.length; i++) {
        result += vec1[i] * vec2[i];
      }
      return result;
    } 

    public toMatrix4() : Matrix4{
        return new Matrix4(this._data);
    }
    public toMatrix3() : Matrix3{
        return new Matrix3(this._data);
    }
    public toMatrix2() : Matrix2{
        return new Matrix2(this._data);
    }

}
export class Matrix2 extends Matrix{
  
    constructor(rows: number[][]) {
        const [[x1, x2], [y1, y2]] = rows;
        let d =  [[x1, x2], [y1, y2]];
        super(d);
    }
 
    public get m11(){return this._data[0][0];} public set m11(v){this._data[0][0] = v;}
    public get m12(){return this._data[0][1];} public set m12(v){this._data[0][1] = v;}
    public get m21(){return this._data[1][0];} public set m21(v){this._data[1][0] = v;}
    public get m22(){return this._data[1][1];} public set m22(v){this._data[1][1] = v;} 

    public multiply(other: Matrix2 | Matrix | Vector): Matrix2 | Matrix | Vector {
        if(other instanceof Matrix2){
            // --- --- --- --- --- ---
            //  | m11 m12 |      | a11 a12 | | x y |
            //  | m21 m22 |   *  | a21 a22 | | z w |
            // --- --- --- --- --- ---
            //  | m11 * x + m12 * z   m11 * y + m12 * w |
            //  | m21 * x + m22 * z   m21 * y + m22 * w |
            // --- --- --- --- --- ---
            return new Matrix2(
                [
                    [(this.m11*other.m11) + (this.m12*other.m21)  ,  (this.m11*other.m12) + (this.m12*other.m22)],
                    [(this.m21*other.m11) + (this.m22*other.m21)  ,  (this.m21*other.m12) + (this.m22*other.m22)]
                ]
            );

 

        } else {
            return  super.multiply(other) ;
        }
    }

    public static identity() : Matrix2{
        return new Matrix2([[1,0],[0,1]]);
    }
}
export class Matrix3 extends Matrix{
  
    constructor(rows: number[][]) {
        const [[x1, x2, x3], [y1,y2,y3], [z1,z2,z3]]= rows;
        let d =  [[x1,x2,x3],[y1,y2,y3],[z1,z2,z3]];
        super(d);
    }
    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    // google Chat GPT
    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    // | a11 a12 a13 |      | x11 x12 x13 |
    // | a21 a22 a23 |   *  | x21 x22 x23 |
    // | a31 a32 a33 |      | x31 x32 x33 |
    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    // | (a11*x11) + (a12*x21) + (a13*x31)  ,  (a11*x12) + (a12*x22) + (a13*x32) ,  (a11*x13) + (a12*x23) + (a13*x33) |
    // | (a21*x11) + (a22*x21) + (a23*x31)  ,  (a21*x12) + (a22*x22) + (a23*x32) ,  (a21*x13) + (a22*x23) + (a23*x33) |
    // | (a31*x11) + (a32*x21) + (a33*x31)  ,  (a31*x12) + (a32*x22) + (a33*x32) ,  (a31*x13) + (a32*x23) + (a33*x33) |
    // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

    public get m11(){return this._data[0][0];} public set m11(v){this._data[0][0] = v;}
    public get m12(){return this._data[0][1];} public set m12(v){this._data[0][1] = v;} 
    public get m13(){return this._data[0][2];} public set m13(v){this._data[0][2] = v;} 

    public get m21(){return this._data[1][0];} public set m21(v){this._data[1][0] = v;}
    public get m22(){return this._data[1][1];} public set m22(v){this._data[1][1] = v;} 
    public get m23(){return this._data[1][2];} public set m23(v){this._data[1][2] = v;} 

    public get m31(){return this._data[2][0];} public set m31(v){this._data[2][0] = v;}
    public get m32(){return this._data[2][1];} public set m32(v){this._data[2][1] = v;} 
    public get m33(){return this._data[2][2];} public set m33(v){this._data[2][2] = v;} 

    public multiply(other: Matrix3 | Matrix | Vector): Matrix2 | Matrix | Vector {
        if(other instanceof Matrix3){
            return new Matrix3(
                [
                    [(this.m11*other.m11) + (this.m12*other.m21) + (this.m13*other.m31)  ,  (this.m11*other.m12) + (this.m12*other.m22) + (this.m13*other.m32) ,  (this.m11*other.m13) + (this.m12*other.m23) + (this.m13*other.m33)],
                    [(this.m21*other.m11) + (this.m22*other.m21) + (this.m23*other.m31)  ,  (this.m21*other.m12) + (this.m22*other.m22) + (this.m23*other.m32) ,  (this.m21*other.m13) + (this.m22*other.m23) + (this.m23*other.m33)],
                    [(this.m31*other.m11) + (this.m32*other.m21) + (this.m33*other.m31)  ,  (this.m31*other.m12) + (this.m32*other.m22) + (this.m33*other.m32) ,  (this.m31*other.m13) + (this.m32*other.m23) + (this.m33*other.m33)]
                ]
            );
        } else {
            return  super.multiply(other) ;
        }
    }

    public static identity() : Matrix2{
        return new Matrix2([[1,0,0],[0,1,0],[0,0,1]]);
    }
}
export class Matrix4 extends Matrix{
  
    constructor(rows: number[][]) {
        const [[x1, x2, x3, x4], [y1,y2,y3,y4], [z1,z2,z3,z4], [c1,c2,c3,c4]]= rows;
        let d =  [[x1, x2, x3, x4], [y1,y2,y3,y4], [z1,z2,z3,z4], [c1,c2,c3,c4]];
        super(d);
    }

    public get m11(){return this._data[0][0];} public set m11(v){this._data[0][0] = v;}
    public get m12(){return this._data[0][1];} public set m12(v){this._data[0][1] = v;} 
    public get m13(){return this._data[0][2];} public set m13(v){this._data[0][2] = v;}
    public get m14(){return this._data[0][3];} public set m14(v){this._data[0][3] = v;}  

    public get m21(){return this._data[1][0];} public set m21(v){this._data[1][0] = v;}
    public get m22(){return this._data[1][1];} public set m22(v){this._data[1][1] = v;} 
    public get m23(){return this._data[1][2];} public set m23(v){this._data[1][2] = v;}
    public get m24(){return this._data[1][3];} public set m24(v){this._data[1][3] = v;}  

    public get m31(){return this._data[2][0];} public set m31(v){this._data[2][0] = v;}
    public get m32(){return this._data[2][1];} public set m32(v){this._data[2][1] = v;} 
    public get m33(){return this._data[2][2];} public set m33(v){this._data[2][2] = v;}
    public get m34(){return this._data[2][3];} public set m34(v){this._data[2][3] = v;}  

    public get m41(){return this._data[3][0];} public set m41(v){this._data[3][0] = v;}
    public get m42(){return this._data[3][1];} public set m42(v){this._data[3][1] = v;} 
    public get m43(){return this._data[3][2];} public set m43(v){this._data[3][2] = v;}
    public get m44(){return this._data[3][3];} public set m44(v){this._data[3][3] = v;}  

    public multiply(other: Matrix4 | Matrix | Vector): Matrix2 | Matrix | Vector {
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        // google Chat GPT
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        // | a11 a12 a13 a14 |      | x11 x12 x13 x14 |
        // | a21 a22 a23 a24 |   *  | x21 x22 x23 x24 |
        // | a31 a32 a33 a34 |      | x31 x32 x33 x34 |
        // | a41 a42 a43 a44 |      | x41 x42 x43 x44 |
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        // | (a11*x11) + (a12*x21) + (a13*x31)+ (a14*x41)  ,  (a11*x12) + (a12*x22) + (a13*x32) + (a14*x42) ,  (a11*x13) + (a12*x23) + (a13*x33)+ (a14*x43) |
        // | (a21*x11) + (a22*x21) + (a23*x31)+ (a24*x41)  ,  (a21*x12) + (a22*x22) + (a23*x32) + (a24*x42) ,  (a21*x13) + (a22*x23) + (a23*x33)+ (a24*x43) |
        // | (a31*x11) + (a32*x21) + (a33*x31)+ (a34*x41)  ,  (a31*x12) + (a32*x22) + (a33*x32) + (a34*x42) ,  (a31*x13) + (a32*x23) + (a33*x33)+ (a34*x43) |
        // | (a41*x11) + (a42*x21) + (a43*x31)+ (a44*x41)  ,  (a41*x12) + (a42*x22) + (a43*x32) + (a44*x42) ,  (a41*x13) + (a42*x23) + (a43*x33)+ (a44*x43) |
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        if(other instanceof Matrix4){
            return new Matrix4(
                [
                    [(this.m11*other.m11) + (this.m12*other.m21) + (this.m13*other.m31) +  (this.m14*other.m41) ,  (this.m11*other.m12) + (this.m12*other.m22) + (this.m13*other.m32) + (this.m14*other.m42) ,  (this.m11*other.m13) + (this.m12*other.m23) + (this.m13*other.m33) + (this.m14*other.m43),  (this.m11*other.m14) + (this.m12*other.m24) + (this.m13*other.m34) + (this.m14*other.m44)  ],
                    [(this.m21*other.m11) + (this.m22*other.m21) + (this.m23*other.m31) +  (this.m24*other.m41) ,  (this.m21*other.m12) + (this.m22*other.m22) + (this.m23*other.m32) + (this.m24*other.m42) ,  (this.m21*other.m13) + (this.m22*other.m23) + (this.m23*other.m33) + (this.m24*other.m43),  (this.m21*other.m14) + (this.m22*other.m24) + (this.m23*other.m34) + (this.m24*other.m44)  ],
                    [(this.m31*other.m11) + (this.m32*other.m21) + (this.m33*other.m31) +  (this.m34*other.m41) ,  (this.m31*other.m12) + (this.m32*other.m22) + (this.m33*other.m32) + (this.m34*other.m42) ,  (this.m31*other.m13) + (this.m32*other.m23) + (this.m33*other.m33) + (this.m34*other.m43),  (this.m31*other.m14) + (this.m32*other.m24) + (this.m33*other.m34) + (this.m34*other.m44)  ],
                    [(this.m41*other.m11) + (this.m42*other.m21) + (this.m43*other.m31) +  (this.m44*other.m41) ,  (this.m41*other.m12) + (this.m42*other.m22) + (this.m43*other.m32) + (this.m44*other.m42) ,  (this.m41*other.m13) + (this.m42*other.m23) + (this.m43*other.m33) + (this.m44*other.m43),  (this.m41*other.m14) + (this.m42*other.m24) + (this.m43*other.m34) + (this.m44*other.m44)  ],
                ]
            );
        } else {
            return  super.multiply(other) ;
        }
    }
    
    public static identity() : Matrix4{
        return new Matrix4([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);
    }
    
    public static RotationMatrixX(angle: number): Matrix4{
        const matrix = Matrix4.identity();
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        matrix.set(1, 1, c);
        matrix.set(1, 2, -s);
        matrix.set(2, 1, s);
        matrix.set(2, 2, c);
        return matrix;
    }
    
    public static RotationMatrixY(angle: number): Matrix4{
        const matrix = Matrix4.identity();
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        matrix.set(0, 0, c);
        matrix.set(0, 2, s);
        matrix.set(2, 0, -s);
        matrix.set(2, 2, c);
        return matrix;
    }
    
    public static RotationMatrixZ(angle: number): Matrix4{
        const matrix = Matrix4.identity();
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        matrix.set(0, 0, c);
        matrix.set(0, 1, -s);
        matrix.set(1, 0, s);
        matrix.set(1, 1, c);
        return matrix;
    }

    private static degreeToRadion = 0.0174532925;
    
    public static RotationMatrixX_Degree(angle: number): Matrix4{ return Matrix4.RotationMatrixX(angle * Matrix4.degreeToRadion ); }
    public static RotationMatrixY_Degree(angle: number): Matrix4{ return Matrix4.RotationMatrixX(angle * Matrix4.degreeToRadion ); }
    public static RotationMatrixZ_Degree(angle: number): Matrix4{ return Matrix4.RotationMatrixX(angle * Matrix4.degreeToRadion ); }
    public static TranslationMatrix(tx: number, ty: number, tz: number): Matrix4 {
        const matrix = Matrix4.identity();
        matrix.set(0, 3, tx);
        matrix.set(1, 3, ty);
        matrix.set(2, 3, tz);
        return matrix;
    }
    public static ScalingMatrix(sx: number, sy: number, sz: number): Matrix4{
        const matrix = Matrix4.identity();
        matrix.set(0, 0, sx);
        matrix.set(1, 1, sy);
        matrix.set(2, 2, sz);
        return matrix;
    }

    public static CreatePerspektiveMatrix(){
        
    }
}
