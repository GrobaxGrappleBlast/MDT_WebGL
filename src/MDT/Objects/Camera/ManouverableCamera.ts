import { mat3, mat4, vec2, vec3, vec4 } from "gl-matrix"; 
import { IEnvironment } from "../../Environment";
import { GlAsset } from "../Object"; 
import { CameraTransform } from "./CameraTransform";


export abstract class ManouverableCamera extends GlAsset{

    private PANNING_ROTATION_SENTITIVITY = 0.005;
    private PANNING_RAISE_SENTITIVITY    = 0.1;
    private ZOOM_SENTITIVITY             = 0.01;

    public transform : CameraTransform = new CameraTransform(); 
    public constructor(environment: IEnvironment){   
        super(environment);
    }
    
    protected panCamera     ( pan   : vec2  ){
        
        const newLoc = this.panCamera_UpDown(pan);
        const ScreenX = pan[0] * this.PANNING_ROTATION_SENTITIVITY;
 
        let loc = this.transform.location;
        let tar = this.transform.targetVector;
        
        //loc=vec3.rotateZ( loc , newLoc , tar , ScreenX )

        this.transform.location = newLoc;
    }
   
    private panCamera_UpDown(pan   : vec2) : vec3 {
        
        const ScreenY = pan[1];
        let radians = (-ScreenY*this.PANNING_RAISE_SENTITIVITY) / 200 * 2 * Math.PI;
        if( Math.abs(this.transform.location[0]) <= 0.01 || Math.abs(this.transform.location[1]) <= 0.01 ){
            // the camera is considered Stuck Atop a Model. 
            if(this.transform.location[2] < 0){
                //console.log("STOP BELLOW THE " + this.transform.location );
            }else{
                //console.log("STOP ATOP THE " + this.transform.location );
            }
        }

        let loc = this.transform.location;
        let tar = this.transform.targetVector;
        
        const viewDir = vec3.sub  (vec3.create(), loc, tar);
        const right   = vec3.cross(vec3.create(), viewDir, this.transform.upVector);
        
        let a = mat4.create();
        let b : vec4 = [ this.transform.location[0],this.transform.location[1],this.transform.location[2] , 1 ];
        mat4.rotate         ( a, a, radians, right );
        vec4.transformMat4  ( b, b, a ); 
 
        return [b[0],b[1],b[2]];
    }

    protected ZoomCamera    ( zoom  : number){
  
        console.log("ZOOM CMA");
        let _zoom = zoom * this.ZOOM_SENTITIVITY;
        let delta = vec3.sub
        (
            vec3.create(),
            this.transform.location    ,
            this.transform.targetVector 
        );         
        
        vec3.scale  ( delta , delta , 1 + _zoom);
        vec3.add    ( delta , this.transform.targetVector , delta); 
 
        this.transform.location = delta;  
        
        //console.log(delta + "\n" + this.transform.location);
    }
    protected RaiseTarget  ( raise : number  ){
        return;
        const target    = this.transform.targetVector;
        target[2]       += raise * this.PANNING_RAISE_SENTITIVITY;
        this.transform.targetVector= target;
    }
    protected easeInOutQuad(t: number): number {
        t /= 0.5;
        if (t < 1) return 0.5 * t * t;
        t--;
        return -0.5 * (t * (t - 2) - 1);
    } 
}