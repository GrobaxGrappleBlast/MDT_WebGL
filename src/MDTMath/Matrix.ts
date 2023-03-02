 

 
 // Matrix calc is copied and Modified from
 // https://github.com/Kapcash/ts-matrix/blob/master/src/Matrix.ts

import { AVector , indexedVector, Vector2, Vector3, Vector4} from "./Vector";

 
 abstract class AMatrix  {

    protected _rows : number;
    protected _cols : number;
    protected _data : Array<Array<number>>;

    public get rows() : number{
        return this._rows;
    }
    public get columns() : number{
        return this._cols;
    }

    protected constructor(rows: number, columns:number, matrix?: number[][] ){
        this._cols = columns;
        this._rows = rows;

        if ( matrix == null ){ 
            //         Neither data is Given               |         Neither data is Given               |  
            this._data = new Array<Array<number>>(rows);
            for (let i = 0; i < rows; i++) {
                this._data[i] = new Array<number>(columns);
            }
        } else { 
            //         Only Matrix is Given                |         Only Matrix is Given                | 
            let value = 0;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    value = matrix[r][c] || 0;
                    this._data[r][c] = value;    
                }
            }
        } 
    } 
    protected abstract construct(rows: number, columns:number, matrix?: number[][] ) : AMatrix;

    /**
 * Get a matrix value, from its position
 * @param row Matrix line, from 0 to `rows`
 * @param col Matric column, from 0 to `columns`
 */
    public at(row: number, col: number): number {
        return this._data[row][col];
    }

    /**
     * Sets all matrix values to 0
     */
    public reset(): void {
        this._data = this._data.map((row) => row.map(() => 0));
    } 

    /**
     * Check if two matrix are equals, value by value
     * @param mat The matrix against to check equality
     */
    public equals(mat: AMatrix): boolean {
        // Reduce on rows -> reduce on columns -> if a value != then false!
        return (this._rows === mat.rows && this._cols === mat.columns)
            && this._data.reduce(// Rows
                (eql: boolean, row, i) => eql && row.reduce(// Columns (real values)
                        (eql2: boolean, val, j) => eql2 && mat.at(i, j) === val, eql)
                , true);
    }

    /**
 * Sets the matrix as an identity matrix
 */
    public setAsIdentity() {
        if (this._rows !== this._cols) throw new Error("Dimension error! The matrix isn't squared!");
        this._data.forEach((row, i) => {
            row.forEach((c, j) => {
                this._data[i][j] = i === j ? 1 : 0;
            });
        });
        return this;
    } 

    /**
     * Computes the product with another matrix
     * @param mat The second operand matrix
     * @throws Error if matrixA.columns != matrixB.rows
     * @return A new Matrix, result of the multiplication
     */
    public multiply(mat: AMatrix): AMatrix {
        if (this._cols !== mat.rows) throw new Error("Dimension error! The operand matrix must have the same number of rows as 'this' matrix columns!");
        const resMatrix = this.construct(this._rows, mat.columns);
        resMatrix._data = resMatrix._data.map((row, i) => {
            return row.map((val, j) => {
                return this._data[i].reduce((sum, elm, k) => sum + (elm * mat.at(k, j)), 0);
            });
        });
        return resMatrix;
    } 

    /**
 * Computes the determinant of the matrix
 * @throws Error if the matrix is not squared
 */
    public determinant(): number {
        if (this._rows !== this._cols) throw new Error("Dimension error! The matrix isn't squared!");
        if (this._rows === this._cols && this._cols === 1) { return this._data[0][0]; }

        let det = 0;
        let sign = 1;
        if (this._rows === 2) {
            det = this._data[0][0] * this._data[1][1] - this._data[1][0] * this._data[0][1];
        } else {
            for (let i = 0; i < this._rows; i++) {
                const minor = this.getCofactor(0, i);
                det += sign * this.at(0, i) * minor.determinant();
                sign = -sign;
            }
        }
        return det;
    }

    /**
* Gets a cofactor matrix
* @param row The row to omit in the matrix
* @param col The column to omit in the matrix
* @return The cofactor matrix sized (r-1)x(c-1)
*/
    public getCofactor(row: number, col: number): AMatrix {
        return this.construct(this._rows - 1, this._cols - 1, this._data
            .filter((v, i) => i !== row) // Remove the unnecessary row
            .map((c) => c.filter((v, i) => i !== col)));
    }

    /**
     * Computes a transposed the matrix
     * @return A new matrix sized (columns) x (rows)
     */
    public transpose(): AMatrix {
        return this.construct(this._cols, this._rows, new Array<number[]>(this._cols).fill([])
            .map((row, i) => new Array<number>(this._rows).fill(0).map((c, j) => this.at(j, i))));
    }

    /**
     * Computes the inversed matrix
     * @return A new matrix inversed
     */
    public inverse() {
        if (this._rows !== this._cols) throw new Error("Dimension error! The matrix isn't squared!");
        const det = this.determinant();
        if (det === 0) throw new Error("Determinant is 0, can't compute inverse.");

        // Get cofactor matrix: i.e. for each matrix value, get the cofactor's determinant
        const cofactorMatrix = this.construct(this._rows, this._cols,
            this._data.map((row, i) => row.map((val, j) => {
                const sign = Math.pow(-1, i + j);
                return sign * this.getCofactor(i, j).determinant();
            })));
        // Transpose it
        const transposedCofactor = cofactorMatrix.transpose();
        // Compute inverse of transposed / determinant on each value
        return this.construct(this._rows, this._cols,
            this._data.map((row, i) => row.map((val, j) => transposedCofactor.at(i, j) / det)));
    }
}
 
export class Matrix extends AMatrix {

    protected override construct(rows: number, columns: number, matrix?: number[][]): Matrix {
        return new Matrix(rows,columns,matrix);
    } 
    protected constructor(rows: number, columns:number, matrix?: number[][] ){
        super(rows,columns,matrix);
    } 
    /**
     * Gets an identity matrix (1 on diagonal)
     * @param dimension Dimension of the squared matrix
     */
    public static identity(dimension: number): Matrix {
        if (dimension < 1) throw Error('Dimension error! Matrix dimension must be positive.');
        return new Matrix(dimension, dimension).setAsIdentity();
    } 
    /**
     * Add an new column to the matrix, filled with 0
     */
    public addAColumn(): Matrix {
        return new Matrix(this._rows, this._cols + 1, this._data);
    } 
    /**
     * Add an new row to the matrix, filled with 0
     */
    public addARow(): Matrix {
        return new Matrix(this._rows + 1, this._cols, this._data);
    }

    public static Multiply<T extends indexedVector>(matrix:  Matrix2 | Matrix3 | Matrix4 , vector: Vector4 | Vector3 | Vector2   ):T{
        
        if(matrix.columns != vector.rows)
            throw new Error("Dimension error! The operand matrix must have the same number of rows as 'this' matrix columns!");

        var a = typeof(vector);
        var b = typeof(Vector4);
            
        if( typeof(vector) == typeof(Vector4) ) {

        }

        var resMatrix = this.construct( this._rows , this._cols);
        for (let i = 0; i < array.length; i++) {
            const element = array[index];
            
        }   

        //const resMatrix = this.construct(this._row, mat.columns);
        //resMatrix._data = resMatrix._data.map((row, i) => {
        //    return row.map((val, j) => {
        //        return this._data[i].reduce((sum, elm, k) => sum + (elm * mat.at(k, j)), 0);
        //    });
        //});
        //return resMatrix;
    } 
}


export class Matrix2 extends AMatrix {

    protected construct(rows: number = null, columns: number = null, matrix?: number[][]): Matrix2 {
       return new Matrix2(matrix);
    }
    public constructor( matrix: number[][] = null ){
        super(2,2,matrix);
    }
}
export class Matrix3 extends AMatrix{
    
    protected construct(rows: number = null, columns: number = null, matrix?: number[][]): Matrix3 {
        return new Matrix3(matrix);
     }

    public constructor( matrix: number[][] = null ){
        super(3,3,matrix);
    }
}
export class Matrix4 extends AMatrix{
    
    protected construct(rows: number = null, columns: number = null, matrix?: number[][]): Matrix4 {
        return new Matrix4(matrix);
     }

    public constructor( matrix: number[][] = null ){
        super(4,4,matrix);
    }
}