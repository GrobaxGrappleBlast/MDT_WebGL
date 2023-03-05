import { IOnChangePublisher, IOnChangeSubscriber } from "../../MDTInterfaces/IOnChangeListener";
import { Matrix4 } from "../../MDTMath/Matrix"; 
import { Vector3 } from "../../MDTMath/Vector";
import { Environment } from "../Environment";
import { BaseObject, GlAsset } from "./Object";
import { CameraTransform } from "./Transform";


export class Camera extends GlAsset {

    private _cameraMatrix : Matrix4;
    private _currentMatrix: Matrix4;
    public get cameraMatrix     (){ 
        var a = this._currentMatrix;
        return a;
    }

    public transform : CameraTransform = new CameraTransform();
    public updateTransform(): void {
        this.transform.update();
    }

    private _fov          : number = Math.PI  * 2;
    private _aspectRatio  : number = 8 / 6;
    private _near         : number = 0.05;
    private _far          : number = 100.0;

    public get fov          (){ return this._fov }        public set fov        (v){ this._fov = v; }
    public get aspectRatio  (){ return this._aspectRatio }public set aspectRatio(v){ this._aspectRatio = v; }
    public get near         (){ return this._near }       public set near       (v){ this._near = v; }
    public get far          (){ return this._far }        public set far        (v){ this._far = v; }

    public constructor(environment: Environment,fov? : number, aspectRatio? : number, near?:number, far? : number ){   
        super(environment);
        this.toPerspectiveCamera(fov,aspectRatio,near,far);

        this.transform.addOnChangeListener( 'camera',() => {
            this._currentMatrix = this.transform.Matrix_transformation.multiply ( this._cameraMatrix ) as Matrix4 ;
        });
        
        this.transform.update(true);
        this._currentMatrix = this.transform.Matrix_transformation.multiply ( this._cameraMatrix ) as Matrix4 ;
    }
   
    private         createPerspectiveMatrix     (fov  : number, aspectRatio  : number, near :number, far  : number ): Matrix4 {
        
        let top     = near * Math.tan(fov * Math.PI / 360.0);
        let bottom  = -top;
        let right   = top * aspectRatio;
        let left    = -right;

        let width   = right - left;
        let height  = top - bottom;
        let depth   = far - near;

        var matrix = new Matrix4([
            [    2 * near / width , 0                   , (right + left) / width    , 0                         ],
            [    0                , 2 * near / height   , (top + bottom) / height   , 0                         ],
            [    0                , 0                   ,-(far + near) / depth      ,-2 * far * near / depth    ],
            [    0                , 0                   ,-1                         , 0                         ]
        ]) 
        
        return matrix;
    }
    
    public          toPerspectiveCamera         (fov? : number, aspectRatio? : number, near?:number, far? : number ): void{
        this._fov         = fov          || this._fov         ;
        this._aspectRatio = aspectRatio  || this._aspectRatio ;
        this._near        = near         || this._near        ;
        this._far         = far          || this._far         ; 
        this._cameraMatrix = this.createPerspectiveMatrix(this._fov, this._aspectRatio , this._near , this._far );
    }
 
    private         createOrthographicMatrix    (fov  : number, aspectRatio  : number, near :number, far  : number ): Matrix4 {

        let top     = near * Math.tan(fov * Math.PI / 360.0);
        let bottom  = -top;
        let right   = top * aspectRatio;
        let left    = -right;

        let width   = right - left;
        let height  = top - bottom;
        let depth   = far - near;

        var matrix = new Matrix4([
            [2 / width, 0, 0, -(right + left) / width],
            [0, 2 / height, 0, -(top + bottom) / height],
            [0, 0, -2 / depth, -(far + near) / depth],
            [0, 0, 0, 1]
        ]);
        
        return matrix;
    }

    public          toOrthographicCamera        (fov? : number, aspectRatio? : number, near?:number, far? : number ): void{
        this._fov         = fov          || this._fov         ;
        this._aspectRatio = aspectRatio  || this._aspectRatio ;
        this._near        = near         || this._near        ;
        this._far         = far          || this._far         ; 
        this._cameraMatrix = this.createOrthographicMatrix(this._fov, this._aspectRatio , this._near , this._far );
    } 

}   