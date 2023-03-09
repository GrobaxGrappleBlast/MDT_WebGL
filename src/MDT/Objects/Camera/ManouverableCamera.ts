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
    
    protected cameraPan     ( pan   : vec2  ){
        
        const ScreenY = pan[1] * this.PANNING_RAISE_SENTITIVITY;
        const ScreenX = pan[0] * this.PANNING_ROTATION_SENTITIVITY;

        let Yradians = (-ScreenY ) / 200 * 2 * Math.PI;

        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        // -- Check if is on top, for if it is, and remains unhandled it glitches
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        if( Math.abs(this.transform.location[0]) <= 0.01 || Math.abs(this.transform.location[1]) <= 0.01 ){
            // the camera is will glitch. 
            if(this.transform.location[2] < 0){
                console.log("STOP BELLOW THE " + this.transform.location );
                Yradians = Math.abs(Yradians);
            }else{
                console.log("STOP ATOP THE " + this.transform.location );
                Yradians = Math.abs(Yradians);
            }
        }

        const loc = this.transform.location;
        const tar = this.transform.targetVector;
 
        const viewDir = vec3.sub  (vec3.create(), loc, tar);
        const right   = vec3.cross(vec3.create(), viewDir, this.transform.upVector);
        
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        // --  apply rotaion -- -- --  apply rotaion -- -- 
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        
        let a = mat4.create();
        let _loc : vec4 = [ this.transform.location[0],this.transform.location[1],this.transform.location[2] , 1 ];
        mat4.rotate         ( a, a, Yradians, right );
        vec4.transformMat4  ( _loc, _loc, a ); 
        let loc2 :vec3= [_loc[0],_loc[1],_loc[2]];
        
        vec3.rotateZ( loc2 as vec3 , loc2 , tar , ScreenX )
        this.transform.location = loc;
    }
    
   
    
    protected cameraZoom    ( zoom  : number){
  
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
    
    protected raiseTarget  ( raise : number  ){
        return;
        const target    = this.transform.targetVector;
        target[2]       += raise * this.PANNING_RAISE_SENTITIVITY;
        this.transform.targetVector= target;
    }
  
}


/*
    cameraPan
    cameraZoom
    cameraTarget

*/