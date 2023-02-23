
export abstract class Matrix extends Array<number>{

    protected abstract get _dimension (): number;
    
    protected   isValidMatrix(matrix : Array<Array<number>> = null){
        let isValid = matrix.length >= this._dimension;
        if(!isValid)
            return isValid;

        for (let i = 0; i <= this._dimension; i++) {
            if( matrix[i].length <= this._dimension  )
                return false;
        }
        return true;
    }
    public      isValid(){
        return this.length = (this._dimension * this._dimension);
    }
    protected _get ( row : number , col : number ){
        let id = row * this._dimension + col;
        return this[id];
    }  

    protected _set ( row : number , col : number, value : number){
        let id = row * this._dimension + col;
        this[id] = value;
    }

}
export class Matrix2 extends Matrix{
    
    protected override get _dimension (){
        return 2;
    };
    
    protected OverridableConstructor(array : Array<number> = null , matrix : Array<Array<number>> = null ){
        
        if( array == null && matrix == null ){
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Neither data is Given               |         Neither data is Given               | 
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            this.m00 = 1; this.m01 = 0;
            this.m11 = 0; this.m11 = 1;
        }else if( array == null ){
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Matrix is Given                |         Only Matrix is Given                |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //let newSet = matrix as Matrix2;
            if( !this.isValidMatrix(matrix) )
                console.error(`The Given Matrix values werent valid, The length in atleast one dimension isent valid`);
            this.m00 = matrix[0][0]; this.m01 = matrix[0][1];
            this.m10 = matrix[1][0]; this.m11 = matrix[1][1];
        }else{
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Array is Given                 |         Only Array is Given                 |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- | 
            let data = array as Matrix2;
            if(data.length < 4)
                console.error("Size of Data Array was less than 4 wich is required by the 2x2 array")
            this.m00 = data.m00, this.m01 = data.m01;
            this.m10 = data.m10, this.m11 = data.m11;
        } 
    }

    // Row 0 --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    
    public get m00 ()               { return this[0];}
    public set m00 ( value: number) {        this[0] = value;} 

    public get m01 ()               { return this[1]; }
    public set m01 ( value: number) {        this[1] = value;} 

    // Row 1 --- --- --- --- --- --- --- --- --- --- --- --- --- ---

    public get m10 ()               { return this[2];}
    public set m10 ( value: number) {        this[2] = value;} 
    
    public get m11 ()               { return this[3]}
    public set m11 ( value: number) {        this[3] = value;} 


    public constructor( array : Array<number> = null , MatrixArray : Array<Array<number>> = null ){
        super(null);
        for (let i = 0; i < (this._dimension * this._dimension); i++) { this.push( 0 ); } 
        this.OverridableConstructor( array, MatrixArray )
    }
    
}
export class Matrix3 extends Matrix{

    protected get _dimension (){
        return 3;
    };

    protected OverridableConstructor(array : Array<number> = null , matrix : Array<Array<number>> = null ){
        
        if( array == null && matrix == null ){
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Neither data is Given               |         Neither data is Given               | 
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            this.m00 = 1; this.m01 = 0; this.m02 = 0;
            this.m10 = 0; this.m11 = 1; this.m12 = 0;
            this.m20 = 0; this.m21 = 0; this.m22 = 1;

        }else if( array == null ){
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Matrix is Given                |         Only Matrix is Given                |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            if( !this.isValidMatrix(matrix) )
                console.error(`The Given Matrix values werent valid, The length in atleast one dimension isent valid`);

            this.m00 = matrix[0][0]; this.m01 = matrix[0][1]; this.m02 = matrix[0][2];
            this.m10 = matrix[1][0]; this.m11 = matrix[1][1]; this.m12 = matrix[1][2];
            this.m20 = matrix[2][0]; this.m21 = matrix[2][1]; this.m22 = matrix[2][2];
        }else{
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Array is Given                 |         Only Array is Given                 |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- | 
            let newSet = array as Matrix3;
            if(array.length < 9)
                console.error("Size of Data Array was less than 4 wich is required by the 2x2 array")
            
            this.m00 = newSet.m00; this.m01 = newSet.m01; this.m02 = newSet.m02;
            this.m10 = newSet.m10; this.m11 = newSet.m11; this.m12 = newSet.m12;
            this.m20 = newSet.m20; this.m21 = newSet.m21; this.m22 = newSet.m22;

           } 
    }

    // Row 0 --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    public get m00 ()               { return this[0];}
    public set m00 ( value: number) {        this[0] = value;} 
    
    public get m01 ()               { return this[1]; }
    public set m01 ( value: number) {        this[1] = value;} 
    
    public get m02 ()               { return this[2]; }
    public set m02 ( value: number) {        this[2] = value;} 

    // Row 1 --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    public get m10 ()               { return this[3];}
    public set m10 ( value: number) {        this[3] = value;} 
    
    public get m11 ()               { return this[4]}
    public set m11 ( value: number) {        this[4] = value;} 
    
    public get m12 ()               { return this[5]}
    public set m12 ( value: number) {        this[5] = value;} 
    
    // Row 2 --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    public get m20 ()               { return this[6];}
    public set m20 ( value: number) {        this[6] = value;} 
    
    public get m21 ()               { return this[7]}
    public set m21 ( value: number) {        this[7] = value;} 
    
    public get m22 ()               { return this[8]}
    public set m22 ( value: number) {        this[8] = value;} 

}
export class Matrix4 extends Matrix{
    
    protected get _dimension (){
        return 4;
    };

    protected OverridableConstructor(array : Array<number> = null , matrix : Array<Array<number>> = null ){
        
        if( array == null && matrix == null ){

            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Neither data is Given               |         Neither data is Given               | 
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |

            this.m00 = 1; this.m01 = 0; this.m02 = 0; this.m03 = 0;
            this.m10 = 0; this.m11 = 1; this.m12 = 0; this.m13 = 0;
            this.m20 = 0; this.m21 = 0; this.m22 = 1; this.m23 = 0;
            this.m30 = 0; this.m31 = 0; this.m32 = 0; this.m33 = 1;

        } else if ( array == null ){

            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Matrix is Given                |         Only Matrix is Given                |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            
            if( !this.isValidMatrix(matrix) )
                console.error(`The Given Matrix values werent valid, The length in atleast one dimension isent valid`);

            this.m00 = matrix[0][0]; this.m01 = matrix[0][1]; this.m02 = matrix[0][2]; this.m02 = matrix[0][3];
            this.m10 = matrix[1][0]; this.m11 = matrix[1][1]; this.m12 = matrix[1][2]; this.m12 = matrix[1][3];
            this.m20 = matrix[2][0]; this.m21 = matrix[2][1]; this.m22 = matrix[2][2]; this.m22 = matrix[2][3];
            this.m30 = matrix[3][0]; this.m31 = matrix[3][1]; this.m32 = matrix[3][2]; this.m32 = matrix[3][3];

        }else{

            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Array is Given                 |         Only Array is Given                 |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- | 
            
            let newSet = array as Matrix4;

            if(array.length < 16)
                console.error("Size of Data Array was less than 4 wich is required by the 2x2 array")
            
            this.m00 = newSet.m00; this.m01 = newSet.m01; this.m02 = newSet.m02; this.m03 = newSet.m03;
            this.m10 = newSet.m10; this.m11 = newSet.m11; this.m12 = newSet.m12; this.m13 = newSet.m13;
            this.m20 = newSet.m20; this.m21 = newSet.m21; this.m22 = newSet.m22; this.m23 = newSet.m23;
            this.m30 = newSet.m30; this.m31 = newSet.m31; this.m32 = newSet.m32; this.m33 = newSet.m33;

           } 
    }

    // Row 0 --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    public get m00 ()               { return this[0];}
    public set m00 ( value: number) {        this[0] = value;} 

    public get m01 ()               { return this[1]; }
    public set m01 ( value: number) {        this[1] = value;} 

    public get m02 ()               { return this[2]; }
    public set m02 ( value: number) {        this[2] = value;}

    public get m03 ()               { return this[3]; }
    public set m03 ( value: number) {        this[3] = value;} 
    
    // Row 1 --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    public get m10 ()               { return this[4];}
    public set m10 ( value: number) {        this[4] = value;} 

    public get m11 ()               { return this[5]}
    public set m11 ( value: number) {        this[5] = value;} 

    public get m12 ()               { return this[6]}
    public set m12 ( value: number) {        this[6] = value;} 

    public get m13 ()               { return this[7]}
    public set m13 ( value: number) {        this[7] = value;} 
    
    // Row 2 --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    public get m20 ()               { return this[8 ];}
    public set m20 ( value: number) {        this[8 ] = value;} 

    public get m21 ()               { return this[9 ]}
    public set m21 ( value: number) {        this[9 ] = value;}

    public get m22 ()               { return this[10]}
    public set m22 ( value: number) {        this[10] = value;} 

    public get m23 ()               { return this[11]}
    public set m23 ( value: number) {        this[11] = value;} 
    
    // Row 3 --- --- --- --- --- --- --- --- --- --- --- --- --- ---
    public get m30 ()               { return this[12];}
    public set m30 ( value: number) {        this[12] = value;}

    public get m31 ()               { return this[13]}
    public set m31 ( value: number) {        this[13] = value;} 

    public get m32 ()               { return this[14]}
    public set m32 ( value: number) {        this[14] = value;}

    public get m33 ()               { return this[15]}
    public set m33 ( value: number) {        this[15] = value;} 

}