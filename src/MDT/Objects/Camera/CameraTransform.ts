import { mat4, vec2, vec3 } from "gl-matrix";
import { BaseAsset } from "../Object";


abstract class cameraTransformAttributes extends BaseAsset{
    
    // --- --- --- --- --- --- --- ---
    // 3D Vectors for current Position Data. 
    // --- --- --- --- --- --- --- ---
    protected _targetVector : vec3 = vec3.create();
    protected _location     : vec3 = [2,2,2];
    public    upVector      : vec3 = [0,0,1];
    
    // --- --- --- --- --- --- --- ---
    // CheckConstants 
    // --- --- --- --- --- --- --- ---
    public  OUTERBOUNDS_MIN_VALUES : vec3 = [-10,-10,-1];
    public  OUTERBOUNDS_MAX_VALUES : vec3 = [ 10,10,10];
    
    protected _MIN_SQUARE_DIST_TO_TARGET = 1; 
    protected _MIN_DIST_TO_TARGET = 1; 
    
    public get MIN_SQUARE_DIST_TO_TARGET()        { return this._MIN_SQUARE_DIST_TO_TARGET } 
    public set MIN_SQUARE_DIST_TO_TARGET(v : number){ 
        this._MIN_SQUARE_DIST_TO_TARGET = v; 
        this._MIN_DIST_TO_TARGET = Math.sqrt(v);
    }

    protected _MAX_SQUARE_DIST_TO_TARGET = 15*15; 
    protected _MAX_DIST_TO_TARGET = 15; 

    public get MAX_SQUARE_DIST_TO_TARGET()        { return this._MAX_SQUARE_DIST_TO_TARGET } 
    public set MAX_SQUARE_DIST_TO_TARGET(v : number){ 
        this._MAX_SQUARE_DIST_TO_TARGET = v; 
        this._MAX_DIST_TO_TARGET = Math.sqrt(v);
    }

    public  isDirty : boolean = true;
    
    // --- --- --- --- --- --- --- --- ---
    // Matricees - Matricees - Matricees -
    // --- --- --- --- --- --- --- --- ---
    public  Matrix_transformation : mat4 = mat4.create();
}

export class CameraTransform extends cameraTransformAttributes {

    // --- --- --- --- --- --- --- --- ---
    // Get Set of Protected Variables  ---
    // --- --- --- --- --- --- --- --- ---
    public get targetVector()        { return this._targetVector } 
    public set targetVector(v : vec3){ 
        this.checkWithinbounds ( v , this.OUTERBOUNDS_MAX_VALUES , this.OUTERBOUNDS_MIN_VALUES);
        this._targetVector = v; 
        this.isDirty = true; 
    }

    public get location()        { return this._location } 
    public set location(v : vec3){  
        this._location =this.checkDistance( v , this._location);
        this.isDirty = true;   
    }
 
    // --- --- --- --- --- --- --- ---
    // Get Set of Protected Variables 
    // --- --- --- --- --- --- --- ---
    public constructor(){
        super();
        this.update();  
    }

    

    private checkDistance( newVec: vec3 , oldVec:vec3){
        const sqrdist = vec3.sqrDist( this.targetVector, newVec);
        if(sqrdist < this.MIN_SQUARE_DIST_TO_TARGET){
           return oldVec;
        }else if(sqrdist > this._MAX_SQUARE_DIST_TO_TARGET){
            vec3.normalize(newVec,newVec);
            vec3.scale(newVec,newVec,this._MAX_DIST_TO_TARGET);
        }
        return newVec;
    }

    private checkWithinbounds   ( out : vec3, UpperBound : vec3, MinBound : vec3){
        // CANT GO TO FAR
        // MIN  
        if( out[0] < MinBound[0] ){ out[0] = MinBound[0];  }
        if( out[1] < MinBound[1] ){ out[1] = MinBound[1];  }
        if( out[2] < MinBound[2] ){ out[2] = MinBound[2];  } 
        // MAX
        if( out[0] > UpperBound[0] ){ out[0] = UpperBound[0]; }
        if( out[1] > UpperBound[1] ){ out[1] = UpperBound[1]; }
        if( out[2] > UpperBound[2] ){ out[2] = UpperBound[2]; } 
        return out;
    } 
     
    public  update              (force : boolean = false){
        
        if( !(force || this.isDirty) ){ 
            return;
        } 

        mat4.lookAt     ( this.Matrix_transformation,this._location,this.targetVector,this.upVector);
        this.isDirty = false;  

    } 
}