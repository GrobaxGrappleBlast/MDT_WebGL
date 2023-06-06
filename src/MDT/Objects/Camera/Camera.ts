import { mat4, vec2, vec3 } from "gl-matrix";
import { IOnChangePublisher, IOnChangeSubscriber } from "../../../MDTInterfaces/IOnChangeListener";
import { Environment, IEnvironment } from "../../Environment";
import { BaseObject, GlAsset } from "../Object"; 
import { CameraController } from "./CameraController";
import { ManouverableCamera } from "./ManouverableCamera";


export class Camera extends CameraController {

    private _projectionMatrix    : mat4 = mat4.create();
    public viewMatrix() { return this.transform.Matrix_transformation;}
    public get projectionMatrix() { return this._projectionMatrix; }     

    protected _fov          : number = 75 * Math.PI/180;
    protected _aspectRatio  : number = 0.5; 
    protected _near         : number = 1e-4;
    protected _far          : number = 100.0;

    public get fov          (){ return this._fov }        public set fov        (v){ this._fov = v;        }
    public get aspectRatio  (){ return this._aspectRatio }public set aspectRatio(v){ this._aspectRatio = v; }
    public get near         (){ return this._near }       public set near       (v){ this._near = v;        }
    public get far          (){ return this._far }        public set far        (v){ this._far = v;         }
 
    private isDirty : boolean = true;
    private isPerspective:boolean = false; 

    public constructor(environment: IEnvironment ){  
        super(environment); 
        this.toPerspectiveCamera(this._fov,this._aspectRatio,this._near,this._far);
        this.update();
    }
    
    public update(): void {
       
        this.transform.update(); 
    }

    public calcFOVFromScreenWidth( screenWidth : number , distanceToScreen : number  = 1){
        console.log("calcFOVFromScreenWidth"); 
        const FOV = 2 * Math.atan(screenWidth / (2 * distanceToScreen ));
        this.fov = FOV;
    }

    public recalculate(): void{ 
        if( this.isPerspective ){  
            this.toPerspectiveCamera(this._fov,this._aspectRatio,this._near,this._far);
        }  
        this.update();
    }

    public toPerspectiveCamera (fov : number, aspectRatio : number, near:number, far : number ): void{
        this.isPerspective = true; 
        console.log("toPerspectiveCamera")
        mat4.perspective(this._projectionMatrix, fov,aspectRatio,near,far);
    }
   
    public toOrthographicCamera (left:number,right:number,bottom:number,top:number,near:number,far:number ): void{
        this.isPerspective = false;
        mat4.identity(this._projectionMatrix);
        mat4.ortho(this._projectionMatrix,left,right,bottom,top,near,far);
    } 
}   