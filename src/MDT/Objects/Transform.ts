

import { IOnChangePublisher, IOnChangeSubscriber } from "../../MDTInterfaces/IOnChangeListener";
import { Matrix, Matrix4 } from "../../MDTMath/Matrix";
import { Vector3 } from "../../MDTMath/Vector";
// import { Vector3 } from "../../MDTMath/Vector";
 
/*

var zAxis = normalize(subtractVectors(eye, target));
  var xAxis = normalize(cross(up, zAxis));
  var yAxis = normalize(cross(zAxis, xAxis));
 
  return [    xAxis[0], yAxis[0], zAxis[0], 0,
    xAxis[1], yAxis[1], zAxis[1], 0,
    xAxis[2], yAxis[2], zAxis[2], 0,
    -dot(xAxis, eye), -dot(yAxis, eye), -dot(zAxis, eye), 1
  ];

*/

export class CameraTransform implements IOnChangePublisher {

    protected listeners : { [name : string ]: IOnChangeSubscriber} = {};
    public addOnChangeListener(name: string, listener: IOnChangeSubscriber): void {
        this.listeners[name] = listener;
    }
    public removeListener(name: string): void {
       delete this.listeners[name];
    }
    private onChange(){
        for( const key in this.listeners ){
            this.listeners[key]();
        }
    }

    public _location : Vector3;
    public get location(){ return this._location } public set location(v){ this._location.SetTo(v) ; this.update() }
    
    private Matrix_translation    : Matrix4;
    private Matrix_rotation       : Matrix4; 
    public  Matrix_transformation : Matrix4;

    private isDirtyLocation : boolean = false;

    public constructor(){
        this._location = new Vector3([0,0,0]);
        this._location.addOnChangeListener("locationVector",() => {
            this.isDirtyLocation = true; 
        });
        this.update(true);  
    }

    public update(force : boolean = false){
        
        if( !force && !this.isDirtyLocation )
            return;

        this.Matrix_translation = Matrix4.TranslationMatrix(this._location.x,this._location.y,this._location.z);
        
        //m.multiply(this.Matrix_translation) as Matrix4;
        this.Matrix_rotation = this.generateLookAt(new Vector3([0,0,0]));
        this.Matrix_transformation = this.Matrix_translation.multiply( this.Matrix_rotation ) as Matrix4;
        this.isDirtyLocation = false; 
        this.onChange();
    } 

    private generateLookAt(target:Vector3) : Matrix4{

        var zAxis = this.location.subtract(target);
        zAxis.normalize();
        var xAxis = (new Vector3([0,0,1])).cross(zAxis);
        xAxis.normalize();
        var yAxis = zAxis.cross(xAxis);
        yAxis.normalize();
        
        return new Matrix4([    
            [xAxis.x, yAxis.x, zAxis.x, 0,],
            [xAxis.y, yAxis.y, zAxis.y, 0,],
            [xAxis.z, yAxis.z, zAxis.z, 0,],
            [-xAxis.dot(target), -yAxis.dot(target), -zAxis.dot(target), 1]
        ]);
    } 
}

export class Transform implements IOnChangePublisher {

    protected listeners : { [name : string ]: IOnChangeSubscriber} = {};
    public addOnChangeListener(name: string, listener: IOnChangeSubscriber): void {
        this.listeners[name] = listener;
    }
    public removeListener(name: string): void {
       delete this.listeners[name];
    }
    private onChange(){
        for( const key in this.listeners ){
            this.listeners[key]();
        }
    }
    public _location : Vector3;
    public _rotation : Vector3;
    public _scale    : Vector3;

    public get location(){ return this._location } public set location(v){ this._location.SetTo(v) ; this.update() }
    public get rotation(){ return this._rotation } public set rotation(v){ this._rotation.SetTo(v) ; this.update() }
    public get scale   (){ return this._scale    } public set scale   (v){ this._scale   .SetTo(v) ; this.update() }

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

        this._location.addOnChangeListener("locationVector",() => {
            this.isDirtyLocation = true; 
            this.isDirty = true;
        });
        this._rotation.addOnChangeListener("rotationVector",() => { 
            this.isDirtyRotation = true;
            this.isDirty = true;
        });
        this._scale   .addOnChangeListener("scaleVector",() => { 
            this.isDirtyScale = true;
            this.isDirty = true;
        });  
        this.update(true);  
    }
 
    public update(force : boolean = false){
        
        if( !force && !this.isDirty )
            return;

        if(force || this.isDirtyLocation ){
            this.Matrix_translation = Matrix4.TranslationMatrix(this._location.x,this._location.y,this._location.z);
        }
        if(force || this.isDirtyRotation){
            var X = Matrix4.RotationMatrixX(this._rotation.x);
            var Y = Matrix4.RotationMatrixX(this._rotation.y);
            var Z = Matrix4.RotationMatrixX(this._rotation.z);
            this.Matrix_rotation = (X.multiply(Y) as Matrix4 ).multiply(Z) as Matrix4;
            console.log("Rotation Matrix : " + this.Matrix_rotation.getDataArray());
        }
        if(force || this.isDirtyScale){
            this.Matrix_scale = Matrix4.ScalingMatrix(this._scale.x,this._scale.y,this._scale.z);
        }


        let m = this.Matrix_scale.multiply(this.Matrix_rotation) as Matrix4;
        this.Matrix_transformation = m.multiply(this.Matrix_translation) as Matrix4;
        
        this.isDirtyLocation = false;
        this.isDirtyRotation = false; 
        this.isDirtyScale    = false;
        this.isDirty = false;
        this.onChange();
    } 
} 