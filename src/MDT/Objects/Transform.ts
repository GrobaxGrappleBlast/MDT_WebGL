

import { IOnChangePublisher, IOnChangeSubscriber } from "../../MDTInterfaces/IOnChangeListener";
import { vec3 , mat4 } from "gl-matrix";
 

export class CameraTransform {

    public targetVector:vec3;
    public upVector : vec3;
    private _location : vec3;

    public get location(){return this._location } 
    public set location(v : vec3){ 
        this._location = v;
        this.isDirty = true;}
  
    public  _Matrix_translation    : mat4; 
    public  Matrix_transformation : mat4;

    public isDirty : boolean = true;

    public constructor(){
        
        this.upVector = vec3.create();
        this.upVector[2] = 1;

        this.targetVector = vec3.create();

        this._location = vec3.create();
        this._Matrix_translation    = mat4.create(); 
        this.Matrix_transformation = mat4.create();

        mat4.identity(this._Matrix_translation    ); 
        mat4.identity(this.Matrix_transformation );


        this.update();  
    }

    public update(force : boolean = false){
        
        if( !force && !this.isDirty ){ 
            return;
        }
        
        mat4.translate  ( this.Matrix_transformation,this.Matrix_transformation,this._location);
        mat4.lookAt     ( this.Matrix_transformation,this._location,this.targetVector,this.upVector);
        
        //this.Matrix_transformation = this._Matrix_translation;
        //mat4.multiply   ( this.Matrix_transformation,this.Matrix_transformation,this.Matrix_transformation )

        this.isDirty = false;  
    } 
}

export class Transform {

    private _location : vec3 = vec3.create();
    private _rotation : vec3 = vec3.create();
    private _scale    : vec3 = vec3.create();

    public get location(){return this._location } public set location(v : vec3){ this._location = v; this.isDirty = true;}
    public get rotation(){return this._rotation } public set rotation(v : vec3){ this._rotation = v; this.isDirty = true;}
    public get scale   (){return this._scale    } public set scale   (v : vec3){ this._scale    = v; this.isDirty = true;}
    
    public isDirty : boolean= false;
 
    public  Matrix_transformation : mat4 = mat4.create();
    
    public constructor(){
        this.scale.fill(1);
        this.update();  
    }
 
    public update(force : boolean = false){
        
        
        if( !force && !this.isDirty )
            return;

        let temp = mat4.create();
        mat4.scale      (this.Matrix_transformation ,temp                       ,this.scale         );
        mat4.rotateX    (temp                       ,this.Matrix_transformation ,this.rotation[0]   );
        mat4.rotateY    (this.Matrix_transformation ,temp                       ,this.rotation[1]   );
        mat4.rotateZ    (temp                       ,this.Matrix_transformation ,this.rotation[2]   );
        mat4.translate  (this.Matrix_transformation ,temp                       ,this._location     );
        this.isDirty = false; 
    } 
 
} 