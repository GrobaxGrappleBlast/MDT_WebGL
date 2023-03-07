
import { RawGeometri } from "./Mesh/Geometri/RawGeometri";
import { StandardMaterial } from "./Mesh/Materials/StandardMaterial";
import { Mesh } from "./Mesh/Mesh";
import { Camera } from "./Objects/Camera";
import { MDTObject } from "./Objects/Object";

export interface IEnvironment{
    gl : WebGLRenderingContext;
    camera : Camera;
    canvas: HTMLCanvasElement;
}
export class Environment implements IEnvironment{

    private objects : {[name:string]:MDTObject}= {};
    public  camera  : Camera;
    public  canvas  : HTMLCanvasElement; 

    public gl : WebGLRenderingContext;  

    public constructor(CallerID :String,canvas : HTMLCanvasElement) {
        
        console.log(CallerID+ " Constructor");
        this.canvas = canvas;  
        this.camera = new Camera(this);
        this.camera.transform.location =  [0.01, 3, 2] ;
         
        this.gl = this.canvas.getContext('webgl');
        
        if(!this.gl){
            throw new Error(`
            Your Browser Does not support WebGl, And therefore the app cannot play.
            Please try again using a different Browser (A browser is a program such
            a Google Chrome, Firefox, Microsoft Edge and others.)
            `);
            return null;
        }  

        this.gl.clearColor(0.3,0.3,0.3,0.9);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT); 
        this.gl.viewport     (0,0,canvas.width,canvas.height);
        this.gl.enable       (this.gl.DEPTH_TEST); 
    }

    public addObject( key:string , geo : RawGeometri ){
        this.objects[key] = new Mesh( this, [geo] , new StandardMaterial(this));
    }
    
    public addObjects( key:string , geo : RawGeometri[] ){
        this.objects[key] = new Mesh( this, geo , new StandardMaterial(this));
    }

    public async renderFrame(){
        
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for(const key in this.objects){
            this.objects[key].draw();
        }
        this.camera.update(); 
    }  
}