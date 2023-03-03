

import { Matrix, Matrix4 } from "../../MDTMath/Matrix";
import { Vector3 } from "../../MDTMath/Vector";
// import { Vector3 } from "../../MDTMath/Vector";
 
export class Transform{

    public _location : Vector3;
    public _rotation : Vector3;
    public _scale    : Vector3;

    public get location(){ return this._location } public set location(v){ this._location = v }
    public get rotation(){ return this._rotation } public set rotation(v){ this._rotation = v }
    public get scale   (){ return this._scale    } public set scale   (v){ this._scale    = v }

    public  Matrix_transformation : Matrix4;
    private Matrix_translation    : Matrix4;
    private Matrix_scale          : Matrix4;
    private Matrix_rotation       : Matrix4;

    private isDirtyLocation : boolean = false;
    private isDirtyRotation : boolean = false;
    private isDirtyScale    : boolean = false;
    private isDirty         : boolean = false;
    

    public constructor(){
        this._location = new Vector3([0,0,0]);
        this._rotation = new Vector3([0,0,0]);
        this._scale    = new Vector3([1,1,1]);

        this._location.addListener("locationVector",() => {
            this.isDirtyLocation = true; 
            this.isDirty = true;
        });
        this._rotation.addListener("rotationVector",() => { 
            this.isDirtyRotation = true;
            this.isDirty = true;
        });
        this._scale   .addListener("scaleVector",() => { 
            this.isDirtyScale = true;
            this.isDirty = true;
        });    
    }
 
    public update(){
        
        if(! this.isDirty )
            return;

        if(this.isDirtyLocation ){
            this.Matrix_translation = Matrix4.TranslationMatrix(this._location.x,this._location.y,this._location.z);
        }
        if(this.isDirtyRotation){
            var X = Matrix4.RotationMatrixX(this._rotation.x);
            var Y = Matrix4.RotationMatrixX(this._rotation.y);
            var Z = Matrix4.RotationMatrixX(this._rotation.z);
            this.Matrix_rotation = (X.multiply(Y) as Matrix4 ).multiply(Z) as Matrix4;
        }
        if(this.isDirtyScale){
            this.Matrix_scale = Matrix4.ScalingMatrix(this._scale.x,this._scale.y,this._scale.z);
        }

        this.Matrix_transformation = ( this.Matrix_translation.multiply( this.Matrix_scale ) as Matrix4 ).multiply(this.Matrix_rotation) as Matrix4;
        
        this.isDirtyLocation = false;
        this.isDirtyRotation = false; 
        this.isDirtyScale    = false;
        this.isDirty = false;
    } 
} 