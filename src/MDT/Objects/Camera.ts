import { Matrix4 } from "../../MDTMath/Matrix"; 

export class Camera extends Object{

    private cameraMatrix : Matrix4;
    public get perspektiveMatrix(){return this.cameraMatrix;}

    private _fov          : number = 45;
    private _aspectRatio  : number = 8 / 6;
    private _near         : number = 0.1;
    private _far          : number = 100.0;

    public get fov          (){ return this._fov }        public set fov        (v){ this._fov = v; }
    public get aspectRatio  (){ return this._aspectRatio }public set aspectRatio(v){ this._aspectRatio = v; }
    public get near         (){ return this._near }       public set near       (v){ this._near = v; }
    public get far          (){ return this._far }        public set far        (v){ this._far = v; }

    public constructor(){   super();}

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
        this.cameraMatrix = this.createPerspectiveMatrix(this._fov, this._aspectRatio , this._near , this._far );
    }
    public static   createPerspectiveCamera     (fov? : number, aspectRatio? : number, near?:number, far? : number ): Camera{
        var camera = new Camera();
        camera.toPerspectiveCamera(fov,aspectRatio,near,far);
        return camera;
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
        this.cameraMatrix = this.createOrthographicMatrix(this._fov, this._aspectRatio , this._near , this._far );
    }
    public static   createOrthographicCamera    (fov? : number, aspectRatio? : number, near?:number, far? : number ): Camera{
        var camera = new Camera();
        camera.toOrthographicCamera(fov,aspectRatio,near,far);
        return camera;
    } 

 
}   