import { mat4, vec2, vec3 } from "gl-matrix";
import { IOnChangePublisher, IOnChangeSubscriber } from "../../MDTInterfaces/IOnChangeListener";
import { Environment, IEnvironment } from "../Environment";
import { BaseObject, GlAsset } from "./Object"; 


class CameraTransform {

    private _targetVector:vec3;
    public targetVector :vec3;

    public upVector   : vec3;
    private _location : vec3;
    public get location()        { return this._location } 
    public set location(v : vec3){ 
    
        this.checkWithinbounds ( this.location, this.OUTERBOUNDS_MAX_VALUES , this.OUTERBOUNDS_MIN_VALUES);
        this.checkoutisedbounds( this.location, this._INNERBOUNDS_MIN_VALUES , this._INNERBOUNDS_MAX_VALUES  )

        this._location = v; 
        this.isDirty = true; 
    }

    public  OUTERBOUNDS_MIN_VALUES  : vec3 = [-10,-10,-1];
    public  OUTERBOUNDS_MAX_VALUES  : vec3 = [ 10, 10,10];

    private _INNERBOUNDS_MIN        : vec3 = [-1,-1,-1 ];
    private _INNERBOUNDS_MAX        : vec3 = [ 1, 1, 1 ];
 
    public  Matrix_translation    : mat4; 
    public  Matrix_transformation : mat4;

    public isDirty : boolean = true;

    public constructor(){
        
        this.upVector = vec3.create();
        this.upVector[2] = 1;

        this.targetVector = vec3.create();
        this._targetVector = this.targetVector;

        this._location = vec3.create();
        this.Matrix_translation    = mat4.create(); 
        this.Matrix_transformation = mat4.create();

        mat4.identity(this.Matrix_translation    ); 
        mat4.identity(this.Matrix_transformation );
 
        this.update();  
    }

    private checkWithinbounds   ( out : vec3, UpperBound : vec3, MinBound : vec3){
        // CANT GO TO FAR
        // MIN 
        let isWithin = true;
        if( out[0] < MinBound[0] ){ out[0] = MinBound[0]; isWithin = false; }
        if( out[1] < MinBound[1] ){ out[1] = MinBound[1]; isWithin = false; }
        if( out[2] < MinBound[2] ){ out[2] = MinBound[2]; isWithin = false; } 
        // MAX
        if( out[0] > UpperBound[0] ){ out[0] = UpperBound[0]; isWithin = false;}
        if( out[1] > UpperBound[1] ){ out[1] = UpperBound[1]; isWithin = false;}
        if( out[2] > UpperBound[2] ){ out[2] = UpperBound[2]; isWithin = false;} 
        return out;
    } 
    private checkoutisedbounds  ( vector : vec3, MinBound : vec3, MaxBound : vec3) : boolean{
        // CANT GO TO FAR
        // MIN  
        let isOutside = true;
        if( vector[0] < MaxBound[0] && vector[0] > MinBound[0] ){ vector[0] = MaxBound[0]; isOutside = false; }
        if( vector[1] < MaxBound[1] && vector[1] > MinBound[1] ){ vector[1] = MaxBound[1]; isOutside = false; }
        if( vector[2] < MaxBound[2] && vector[2] > MinBound[2] ){ vector[2] = MaxBound[2]; isOutside = false; }
        return isOutside;
    } 
    public  update              (force : boolean = false){

        if( !force && !this.isDirty ){ 
            return;
        }
        
        this.checkWithinbounds(this.location, this.OUTERBOUNDS_MAX_VALUES , this.OUTERBOUNDS_MIN_VALUES);
        mat4.translate  ( this.Matrix_transformation,this.Matrix_transformation,this._location);
        mat4.lookAt     ( this.Matrix_transformation,this._location,this.targetVector,this.upVector);
        
        //this.Matrix_transformation = this._Matrix_translation;
        //mat4.multiply   ( this.Matrix_transformation,this.Matrix_transformation,this.Matrix_transformation )

        this.isDirty = false;  
    } 
     
    
}

abstract class ManouverableCamera extends GlAsset{


    private PANNING_ROTATION_SENTITIVITY = 0.01;
    private PANNING_RAISE_SENTITIVITY    = 0.01;
    private ZOOM_SENTITIVITY             = 2;

    public transform : CameraTransform = new CameraTransform(); 
    public constructor(environment: IEnvironment){   
        super(environment);
    }

    protected panCamera     ( pan   : vec2  ){

        console.log(`Panning Camera, Rotating Around Z ${ pan[0] * this.PANNING_ROTATION_SENTITIVITY } radians, And raising ${pan[1] * this.PANNING_RAISE_SENTITIVITY}`);
        
        let n = vec3.create();
        let l = this.environment.camera.transform.location;
        
        vec3.rotateZ( n , l, this.environment.camera.transform.targetVector , (pan[0] * this.PANNING_ROTATION_SENTITIVITY ) );
        n[2] += pan[1] * this.PANNING_RAISE_SENTITIVITY ;
        
        this.environment.camera.transform.targetVector[2] += pan[1] * this.PANNING_RAISE_SENTITIVITY;
        this.environment.camera.transform.location = n;

    }
    protected ZoomCamera    ( zoom  : number){
        
        zoom *= this.ZOOM_SENTITIVITY;
        let delta = vec3.create();
        vec3.subtract(
            delta,
            this.environment.camera.transform.location,
            this.environment.camera.transform.targetVector
        )

        vec3.normalize(delta,delta);
        let delta2 = vec3.create();
        vec3.multiply(delta2,delta,[zoom,zoom,zoom]);
        console.log(`Multiplying ${delta} with ${this.ZOOM_SENTITIVITY} equal ${delta2}`)


        this.environment.camera.transform.location = delta;

    }
    protected ChangeTarget  ( target: vec3  ){

    }
    protected easeInOutQuad(t: number): number {
        t /= 0.5;
        if (t < 1) return 0.5 * t * t;
        t--;
        return -0.5 * (t * (t - 2) - 1);
    }

}

abstract class MouseCamera extends ManouverableCamera{
    
    private isLeftButtonDown    = false;
    private isMiddleButtonDown  = false;
    private isRightButtonDown   = false;
    private lastMouseX = 0;
    private lastMouseY = 0;

    protected setUpControlls(canvas: HTMLCanvasElement){
         
        canvas.addEventListener("mousedown", (event: MouseEvent) => {
            event.preventDefault();
            if (event.button === 0) {
                console.log("MOUSE DOWN LEFT");
                this.isLeftButtonDown = true;
            } else if (event.button === 1) {
                console.log("MOUSE DOWN MID");
                this.isMiddleButtonDown = true;
            } else if (event.button === 2) {
                console.log("MOUSE DOWN RIGHT");
                this.isRightButtonDown = true;
            }
        });

        canvas.addEventListener("mouseup", (event: MouseEvent) => {
            event.preventDefault();
            
            if (event.button === 0) {
                console.log("MOUSE UP LEFT");
                this.isLeftButtonDown = false;
            } else if (event.button === 1) {
                console.log("MOUSE UP MID");
                this.isMiddleButtonDown = false;
            } else if (event.button === 2) {
                console.log("MOUSE UP Right");
                this.isRightButtonDown = false;
            }
        });

        canvas.addEventListener("mousemove", (event: MouseEvent) => {
            //console.log("MOUSE MOVE");
            const deltaX = event.clientX -  this.lastMouseX;
            const deltaY = event.clientY -  this.lastMouseY;

            if ( this.isLeftButtonDown) {
                // handle left mouse button drag
            }

            if ( this.isMiddleButtonDown) {
                // handle middle mouse button drag
            }

            if ( this.isRightButtonDown) {
                // handle right mouse button drag
            }

            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;
        });

        canvas.addEventListener("wheel", (event: WheelEvent) => {
            event.preventDefault();
            if(event.ctrlKey || event.metaKey){
                // Zoom 
                this.ZoomCamera(event.deltaY);
            }else{
                // Panning
                this.panCamera([event.deltaX, event.deltaY]);
            } 
        });

        canvas.addEventListener("scroll", (event: Event) => {
            event.preventDefault();
            console.log("MOUSE WHEEL SCROLL");
            
        });

    }
}

abstract class touchscreenCamera extends MouseCamera{

    protected TOUCH_ZOOM_MIN_LIMIT = 1;

    private isFirst = true;
    private last_ZOOM_Squarelength: number = 0; 
    private last_PANN_DeltaTouch  : number = 0;

    public constructor(environment: IEnvironment){
        super(environment);
        this.setUpControlls(environment.canvas);
    }

    private handleTouchStart(event: TouchEvent) {
        event.preventDefault();   
        console.log("HANDLE TOUCH START");
        switch(event.touches.length){
            case 2:

                console.log(`Touch at ${event.touches[0].clientX} , ${ event.touches[1].clientX}`);
                const deltaTouch : vec2 = [
                    Math.abs(event.touches[0].clientX - event.touches[1].clientX),
                    Math.abs(event.touches[0].clientY - event.touches[1].clientY)
                    ];
                const sqrLength = vec2.squaredLength(deltaTouch);

                if( sqrLength > this.TOUCH_ZOOM_MIN_LIMIT ){ 
                    if(this.isFirst){
                        this.last_ZOOM_Squarelength = sqrLength;
                        return;
                    }
                    this.ZoomCamera( sqrLength - this.last_ZOOM_Squarelength );
                    this.last_ZOOM_Squarelength = sqrLength;
                }else{
                    this.panCamera(deltaTouch);
                }
                break;
            default:
        } 
    }
      
    private handleTouchMove(event: TouchEvent) {
        event.preventDefault();
        console.log("HANDLE TOUCH MOVE");
    }

    protected  setUpControlls(canvas: HTMLCanvasElement){
        super.setUpControlls(canvas);
        canvas.addEventListener('touchstart', this.handleTouchStart, false);
        canvas.addEventListener('touchmove',  this.handleTouchMove , false);
    } 
}

export class Camera extends touchscreenCamera {

    private projectionMatrix    : mat4 = mat4.create();
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

    public constructor(environment: IEnvironment,fov? : number, aspectRatio? : number, near?:number, far? : number ){   
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