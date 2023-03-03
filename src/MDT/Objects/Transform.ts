

import { Matrix, Matrix4 } from "../../MDTMath/Matrix";
import { Vector3 } from "../../MDTMath/Vector";
// import { Vector3 } from "../../MDTMath/Vector";
 
export class Transform{

    public location : Vector3;
    public rotation : Vector3;
    public scale    : Vector3;

    public  Matrix_transformation : Matrix4;
    private Matrix_translation    : Matrix4;
    private Matrix_scale          : Matrix4;
    private Matrix_rotation       : Matrix4;

    private isDirtyLocation : boolean = false;
    private isDirtyRotation : boolean = false;
    private isDirtyScale    : boolean = false;
    private isDirty         : boolean = false;
    

    public constructor(){
        this.location = new Vector3([0,0,0]);
        this.rotation = new Vector3([0,0,0]);
        this.scale    = new Vector3([1,1,1]);

        this.location.addListener("locationVector",() => {
            this.isDirtyLocation = true; 
            this.isDirty = true;
        });
        this.rotation.addListener("rotationVector",() => { 
            this.isDirtyRotation = true;
            this.isDirty = true;
        });
        this.scale   .addListener("scaleVector",() => { 
            this.isDirtyScale = true;
            this.isDirty = true;
        });    
    }


    private update(){
        
        if(! this.isDirty )
            return;

        if(this.isDirtyLocation ){
            this.Matrix_translation = Matrix4.TranslationMatrix(this.location.x,this.location.y,this.location.z);
        }
        if(this.isDirtyRotation){
            var X = Matrix4.RotationMatrixX(this.rotation.x);
            var Y = Matrix4.RotationMatrixX(this.rotation.y);
            var Z = Matrix4.RotationMatrixX(this.rotation.z);
            this.Matrix_rotation = (X.multiply(Y) as Matrix4 ).multiply(Z) as Matrix4;
        }
        if(this.isDirtyScale){
            this.Matrix_scale = Matrix4.ScalingMatrix(this.scale.x,this.scale.y,this.scale.z);
        }

        this.Matrix_transformation = ( this.Matrix_translation.multiply( this.Matrix_scale ) as Matrix4 ).multiply(this.Matrix_rotation) as Matrix4;
        
        this.isDirtyLocation = false;
        this.isDirtyRotation = false; 
        this.isDirtyScale    = false;
        this.isDirty = false;
    } 
} 