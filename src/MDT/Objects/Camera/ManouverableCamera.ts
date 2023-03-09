import { mat3, mat4, vec2, vec3, vec4 } from "gl-matrix"; 
import { IEnvironment } from "../../Environment";
import { GlAsset } from "../Object"; 
import { CameraTransform } from "./CameraTransform";


export abstract class ManouverableCamera extends GlAsset{

    private PANNING_ROTATION_SENTITIVITY = 0.03;
    private PANNING_RAISE_SENTITIVITY    = 0.3;
    private ZOOM_SENTITIVITY             = 0.01;

    public transform : CameraTransform = new CameraTransform(); 
    public constructor(environment: IEnvironment){   
        super(environment);
    }
    
    private lastloc :vec3 = vec3.create() ;
    protected cameraPan     ( pan   : vec2  ){
        
        const ScreenY = pan[1] * this.PANNING_RAISE_SENTITIVITY;
        const ScreenX = pan[0] * this.PANNING_ROTATION_SENTITIVITY;

        let Yradians = (-ScreenY ) / 200 * 2 * Math.PI;

        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
        // -- Check if is on top, for if it is, and remains unhandled it glitches
        // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
       
        const loc = this.transform.location;
        const tar = this.transform.targetVector;
        if( loc[0]*loc[0] + loc[1]*loc[1] <= 0.1 ){
            // the camera is will glitch. 
            if(this.transform.location[2] < this.transform.targetVector[2]){
                if(Yradians < 0)
                    return;
            }else{
                if(Yradians > 0)
                    return;
            }
        }


 
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
    
        // before adding, i want to ensure that this movement hasent overstepped the center. 
        // if it has overstepped the center, then i wont apply the movement. 
        let x_bothNeg = loc2[0] < 0 ? this.lastloc[0] <= 0 : this.lastloc[0] >= 0 ;
        let y_bothNeg = loc2[1] < 0 ? this.lastloc[1] <= 0 : this.lastloc[1] >= 0 ;
        if( (!x_bothNeg) && (!y_bothNeg) )
            return;
        
        this.transform.location = loc2; 
        this.lastloc = loc2;
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