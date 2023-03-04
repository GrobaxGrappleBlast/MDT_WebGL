import { Matrix4 } from "../../MDTMath/Matrix"; 
import { Vector3 } from "../../MDTMath/Vector";
import { Environment } from "../Environment";
import { BaseObject } from "./Object";


export class Camera extends BaseObject{
    
    
    

    private _cameraMatrix : Matrix4;
    public get cameraMatrix     (){return this._cameraMatrix;} 

    private _fov          : number = 45;
    private _aspectRatio  : number = 8 / 6;
    private _near         : number = 0.1;
    private _far          : number = 100.0;

    public get fov          (){ return this._fov }        public set fov        (v){ this._fov = v; }
    public get aspectRatio  (){ return this._aspectRatio }public set aspectRatio(v){ this._aspectRatio = v; }
    public get near         (){ return this._near }       public set near       (v){ this._near = v; }
    public get far          (){ return this._far }        public set far        (v){ this._far = v; }

    public constructor(environment: Environment){   
        super(environment);
        this.toPerspectiveCamera();
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
        
        //let fov     = 45;
        //let aspectRatio = gl.canvas.width / gl.canvas.height;
        //let near    = 0.1;
        //let far     = 100.0;

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

    public lookAt( target : Vector3 ):void {

        console.log("HERE");
        //var up = new Vector3([0,0,1]);

        // Calculate the forward direction vector

        var test = new Vector3([1,2,3]);
        var forward : Vector3 = target.subtract(this.transform.location); 
        forward.normalize();

        //var right = forward.cross(up);
        //right.normalize();

        // Calculate the new up vector by taking the cross product of the right and forward vectors
        //var newUp = right.cross(forward);
        //newUp.normalize(); 

         // Calculate the pitch angle (around the x-axis)
        var pitch = Math.asin(-forward.x);
            
        // Calculate the yaw angle (around the y-axis)
        var yaw = Math.atan2(-forward.x, -forward.z);
            
        // Calculate the roll angle (around the z-axis)
        var roll = 0;
            
        this.transform.rotation = new Vector3([pitch, yaw, roll]);

        // // Create a 4x4 transformation matrix
        // var lookat = new Matrix4
        // ([
        //     [ right.x,newUp.x,-forward.x,0.0 ],
        //     [ right.y,newUp.y,-forward.y,0.0 ],
        //     [ right.z,newUp.z,-forward.z,0.0 ],
        //     [ 0.0    ,0.0    ,0.0       ,1.0 ]
        // ]);
        // 
        // 
        // //([
        // //    [ right.x,newUp.x,-forward.x,0.0,],
        // //    [ right.y,newUp.y,-forward.y,0.0,],
        // //    [ right.z,newUp.z,-forward.z,0.0,],
        // //    [ -right.dot( this.transform.location ), -newUp.dot(this.transform.location), forward.dot(this.transform.location),1.0]
        // //])
        // 
        // var v = new Vector3();
        // return result;
    }
      

}   