import { vec2, vec3 } from "gl-matrix";
import { IEnvironment } from "../../Environment";
import { GlAsset } from "../Object"; 
import { CameraTransform } from "./CameraTransform";


export abstract class ManouverableCamera extends GlAsset{

    private PANNING_ROTATION_SENTITIVITY = 0.01;
    private PANNING_RAISE_SENTITIVITY    = 0.01;
    private ZOOM_SENTITIVITY             = 0.01;

    public transform : CameraTransform = new CameraTransform(); 
    public constructor(environment: IEnvironment){   
        super(environment);
    }
    protected panCamera     ( pan   : vec2  ){

        let n = vec3.create();
        let l = this.transform.location;
        
        vec3.rotateZ( n , l, this.transform.targetVector , (pan[0] * this.PANNING_ROTATION_SENTITIVITY ) );
        n[2] += pan[1] * this.PANNING_RAISE_SENTITIVITY ;
        
        const target = this.transform.targetVector;
        target[2] += pan[1] * this.PANNING_RAISE_SENTITIVITY;
        
        this.transform.setLocAndTarget(n,target);

    }
    protected ZoomCamera    ( zoom  : number){
        
        zoom *= this.ZOOM_SENTITIVITY;
        let delta = vec3.create();
        vec3.subtract(
            delta,
            this.transform.targetVector ,
            this.transform.location    
            )
        vec3.scale( delta,delta, zoom + 1 )
          
        this.transform.location = delta; 
    }
    protected RaiseTarget  ( raise : number  ){
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