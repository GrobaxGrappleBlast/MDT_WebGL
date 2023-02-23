
interface MatrixOnChangeListener {
    (): void;
}

export class Matrix2 extends Array<Array<number>>{
    
    protected get _dimension (){
        return 2;
    };
    protected listeners : ( MatrixOnChangeListener )[] = [];
    
    public addListener( listener : MatrixOnChangeListener){
        this.listeners.push(listener);
    }
    protected callListeners(){
        if(this.listeners.length != 0){
            this.listeners.forEach( (listener) => {
                listener.call(null);
            })
        }
    }

    protected OverridableConstructor(array : Array<number> = null , matrix : Array<Array<number>> = null ){
        
        if( array == null && matrix == null ){
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Neither data is Given               |         Neither data is Given               | 
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            this[0] = [1,0]; 
            this[1] = [0,1];
        }else if( array == null ){
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Matrix is Given                |         Only Matrix is Given                |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            let newSet = matrix as Matrix2;
            if(!newSet.isValid())
                console.error(`The Given Matrix values werent valid, The length in atleast one dimension isent valid`);
            this.m00 = newSet.m00, this.m01 = newSet.m01,
            this.m11 = newSet.m11, this.m11 = newSet.m11
        }else{
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Array is Given                 |         Only Array is Given                 |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- | 
            if(array.length < 4)
                console.error("Size of Data Array was less than 4 wich is required by the 2x2 array")
            this.m00 = array[0], this.m01 = array[1],
            this.m11 = array[2], this.m11 = array[4]
        } 
    }

    public isValid(){
        return this.length >= 2 && this[0].length >= 2  && this[1].length >= 2;
    }
    
    protected _get ( row : number , col : number ){
        return this[row][col];
    }   
    protected _set ( row : number , col : number, value : number){
        this[row][col] = value;
        this.callListeners();
    }

    public get m00 ()               { return this._get(0,0)}
    public set m00 ( value: number) { this._set(0,0,value)} 

    public get m01 ()               { return this._get(0,1)}
    public set m01 ( value: number) { this._set(0,1,value)} 

    public get m11 ()               { return this._get(1,1)}
    public set m11 ( value: number) { this._set(1,1,value)} 
    
    public get m10 ()               { return this._get(1,0)}
    public set m10 ( value: number) { this._set(1,0,value)} 

    public constructor( array : Array<number> = null , MatrixArray : Array<Array<number>> = null ){
        super(null);
        for (let i = 0; i < this._dimension; i++) {
            this.push( new Array<number>(this._dimension));
        } 
        this.OverridableConstructor( array, MatrixArray )
    }
    
}
export class Matrix3 extends Matrix2{

    protected get _dimension (){
        return 3;
    };
    protected override OverridableConstructor(array : Array<number> = null , matrix : Array<Array<number>> = null ){
        
        if( array == null && matrix == null ){
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Neither data is Given               |         Neither data is Given               | 
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            this[0] = [1,0,0]; 
            this[1] = [0,1,0];
            this[2] = [0,0,1];
        }else if( array == null ){
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Matrix is Given                |         Only Matrix is Given                |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            let newSet = matrix as Matrix3;
            if(!newSet.isValid())
                console.error(`The Given Matrix values werent valid, The length in atleast one dimension isent valid`);
            
            this.m00 = newSet.m00, this.m01 = newSet.m01, this.m02 = newSet.m02,
            this.m10 = newSet.m10, this.m11 = newSet.m11, this.m12 = newSet.m12,
            this.m20 = newSet.m20, this.m21 = newSet.m21, this.m22 = newSet.m22
        }else{
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Array is Given                 |         Only Array is Given                 |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- | 
            if(array.length < 9)
                console.error("Size of Data Array was less than 4 wich is required by the 2x2 array")
            
            let i = 0;
            this.m00 = array[i++], this.m01 = array[i++], this.m02 = array[i++],
            this.m10 = array[i++], this.m11 = array[i++], this.m12 = array[i++],
            this.m20 = array[i++], this.m21 = array[i++], this.m22 = array[i++]
        } 
    }

    public override isValid(){
        return this.length >= 3 && this[0].length >= 3  && this[1].length >= 3 && this[2].length >= 3;
    }

    // new Column 
    public get m02 ()               { return this._get(0,2)}
    public set m02 ( value: number) {        this._set(0,2,value)} 

    public get m12 ()               { return this._get(1,2)}
    public set m12 ( value: number) {        this._set(1,2,value)} 

    // new Row
    public get m20 ()               { return this._get(2,0)}
    public set m20 ( value: number) {        this._set(2,0,value)} 
    
    public get m21 ()               { return this._get(2,1)}
    public set m21 ( value: number) {        this._set(2,1,value)} 
    
    //New Rows New Column
    public get m22 ()               { return this._get(2,2)}
    public set m22 ( value: number) {        this._set(2,2,value)} 
    
}
export class Matrix4 extends Matrix3{
    protected get _dimension (){
        return 4;
    };

    protected override OverridableConstructor(array : Array<number> = null , matrix : Array<Array<number>> = null ){
        
        if( array == null && matrix == null ){
        
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Neither data is Given               |         Neither data is Given               | 
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
        
            this[0] = [1,0,0,0]; 
            this[1] = [0,1,0,0];
            this[2] = [0,0,1,0];
            this[3] = [0,0,0,1];
        
        }else if( array == null ){
            
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Matrix is Given                |         Only Matrix is Given                |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            
            let newSet = matrix as Matrix4;
            
            if(!newSet.isValid())
                console.error(`The Given Matrix values werent valid, The length in atleast one dimension isent valid`);
            
            this.m00 = newSet.m00; this.m01 = newSet.m01; this.m02 = newSet.m02 ;this.m03 = newSet.m03;
            this.m10 = newSet.m10; this.m11 = newSet.m11; this.m12 = newSet.m12 ;this.m13 = newSet.m13;
            this.m20 = newSet.m20; this.m21 = newSet.m21; this.m22 = newSet.m22 ;this.m23 = newSet.m23;
            this.m30 = newSet.m30; this.m31 = newSet.m31; this.m32 = newSet.m32 ;this.m33 = newSet.m33;
        
        }else{
        
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- |
            //         Only Array is Given                 |         Only Array is Given                 |
            // --- --- --- --- --- --- --- --- --- --- --- | --- --- --- --- --- --- --- --- --- --- --- | 
        
            if(array.length < 16)
                console.error("Size of Data Array was less than 4 wich is required by the 2x2 array")
            
            let i = 0;
            this.m00 = array[i++]; this.m01 = array[i++]; this.m02 = array[i++];this.m03 = array[i++];
            this.m10 = array[i++]; this.m11 = array[i++]; this.m12 = array[i++];this.m13 = array[i++];
            this.m20 = array[i++]; this.m21 = array[i++]; this.m22 = array[i++];this.m23 = array[i++];
            this.m30 = array[i++]; this.m31 = array[i++]; this.m32 = array[i++];this.m33 = array[i++];
        } 
    }

    public override isValid(){
        return this.length >= 4 && this[0].length >= 4  && this[1].length >= 4 && this[2].length >= 4 && this[3].length >= 4;
    }

    // new Column 
    public get m03 ()               { return this._get(0,3)}
    public set m03 ( value: number) {        this._set(0,3,value)} 

    public get m13 ()               { return this._get(1,3)}
    public set m13 ( value: number) {        this._set(1,3,value)} 
    
    public get m23 ()               { return this._get(2,3)}
    public set m23 ( value: number) {        this._set(2,3,value)} 

    // new Row
    public get m30 ()               { return this._get(3,0)}
    public set m30 ( value: number) {        this._set(3,0,value)} 
    
    public get m31 ()               { return this._get(3,1)}
    public set m31 ( value: number) {        this._set(3,1,value)} 
    
    public get m32 ()               { return this._get(3,2)}
    public set m32 ( value: number) {        this._set(3,2,value)} 
    
    //New Rows New Column
    public get m33 ()               { return this._get(3,3)}
    public set m33 ( value: number) {        this._set(3,3,value)} 
}