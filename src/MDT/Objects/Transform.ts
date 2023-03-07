

import { IOnChangePublisher, IOnChangeSubscriber } from "../../MDTInterfaces/IOnChangeListener";
import { vec3 , mat4 } from "gl-matrix";

export class Transform {

    /*
        GOOGLE SIGER
        // Extract the camera's position vector
        const position: vec3 = vec3.create();
        mat4.getTranslation(position, view);

    */

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