import { mat4, vec2, vec3 } from "gl-matrix";


abstract class cameraTransformAttributes{
    
    // --- --- --- --- --- --- --- ---
    // 3D Vectors for current Position Data. 
    // --- --- --- --- --- --- --- ---
    
    protected _targetVector : vec3 = vec3.create();
    protected _location     : vec3 = vec3.create();
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

    public  isDirty : boolean = true;
    
    // --- --- --- --- --- --- --- --- ---
    // Matricees - Matricees - Matricees -
    // --- --- --- --- --- --- --- --- ---
    public  Matrix_translation    : mat4 = mat4.create();  
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
        this.checkWithinbounds ( v , this.OUTERBOUNDS_MAX_VALUES , this.OUTERBOUNDS_MIN_VALUES);
        this.checkMinBounds( v );
        this._location = v; 
        this.isDirty = true; 
    }

    public setLocAndTarget(location:vec3, target:vec3){
        this.checkWithinbounds ( target   , this.OUTERBOUNDS_MAX_VALUES , this.OUTERBOUNDS_MIN_VALUES);
        this._targetVector = target;
        this.checkWithinbounds ( location , this.OUTERBOUNDS_MAX_VALUES , this.OUTERBOUNDS_MIN_VALUES);
        this.checkMinBounds( location );
        this._location = location; 
        this.isDirty = true; 
    }

    // --- --- --- --- --- --- --- ---
    // Get Set of Protected Variables 
    // --- --- --- --- --- --- --- ---

    public constructor(){
        super();
        this.update();  
    }

    private checkMinBounds( out: vec3 ){
        const sqrdist = vec3.sqrDist( this.targetVector, out);
        if(sqrdist < this.MIN_SQUARE_DIST_TO_TARGET){
            vec3.normalize(out,out);
            vec3.scale(out,out,this._MIN_DIST_TO_TARGET);
        }
        return out;
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
        if( !force && !this.isDirty ){ 
            return;
        } 

        this.checkWithinbounds(this.location, this.OUTERBOUNDS_MAX_VALUES , this.OUTERBOUNDS_MIN_VALUES);
        mat4.translate  ( this.Matrix_transformation,this.Matrix_transformation,this._location);
        mat4.lookAt     ( this.Matrix_transformation,this._location,this.targetVector,this.upVector);
        this.isDirty = false;  
    } 
}