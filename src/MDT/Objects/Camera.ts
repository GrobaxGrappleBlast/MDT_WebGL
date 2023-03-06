import { mat4 } from "gl-matrix";
import { IOnChangePublisher, IOnChangeSubscriber } from "../../MDTInterfaces/IOnChangeListener";
import { Environment } from "../Environment";
import { BaseObject, GlAsset } from "./Object";
import { CameraTransform } from "./Transform";


export abstract class ACamera extends GlAsset{
    
    public transform : CameraTransform = new CameraTransform(); 
    public constructor(environment: Environment){   
        super(environment);
    }
}

export class Camera extends ACamera {

    private projectionMatrix   : mat4 = mat4.create();
    public  cameraMatrix        : mat4 = mat4.create();


    protected _fov          : number = 75 * Math.PI/180;
    protected _aspectRatio  : number = 0.5;
    protected _near         : number = 1e-4;
    protected _far          : number = 100.0;

    public get fov          (){ return this._fov }        public set fov        (v){ this._fov = v;         }
    public get aspectRatio  (){ return this._aspectRatio }public set aspectRatio(v){ this._aspectRatio = v; }
    public get near         (){ return this._near }       public set near       (v){ this._near = v;        }
    public get far          (){ return this._far }        public set far        (v){ this._far = v;         }

    private isDirty : boolean = true;

    public constructor(environment: Environment,fov? : number, aspectRatio? : number, near?:number, far? : number ){   
        super(environment);

        this._fov           == fov            || this._fov          ;
        this._aspectRatio   == aspectRatio    || this._aspectRatio  ;
        this._near          == near           || this._near         ;
        this._far           == far            || this._far          ;
        
        this.toPerspectiveCamera(this._fov,this._aspectRatio,this._near,this._far);
        this.update();
         
    }
   
    public update(): void {
        if( !this.isDirty && !this.transform.isDirty ){
            return;
        }
        this.transform.update();
        mat4.multiply( this.cameraMatrix, this.projectionMatrix,  this.transform.Matrix_transformation);
        this.isDirty = false;
    }

    public toPerspectiveCamera (fov : number, aspectRatio : number, near:number, far : number ): void{
        mat4.identity(this.projectionMatrix);
        mat4.perspective(this.projectionMatrix, fov,aspectRatio,near,far);
    }
   
    public toOrthographicCamera (left:number,right:number,bottom:number,top:number,near:number,far:number ): void{
        mat4.identity(this.projectionMatrix);
        mat4.ortho(this.projectionMatrix,left,right,bottom,top,near,far);
    } 
}   