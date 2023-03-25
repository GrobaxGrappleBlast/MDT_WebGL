
import { vec3 } from "gl-matrix"; 
import { MDTFileMeshPrimitive } from "../FileLoading/LoadedFile/MDTFile";
import { StandardMaterial } from "./Mesh/Materials/StandardMaterial";
import { Mesh } from "./Mesh/Mesh";
import { Camera } from "./Objects/Camera/Camera";
import { BaseAsset, MDTObject } from "./Objects/Object";

export interface IEnvironment{
    gl : WebGLRenderingContext;
    camera : Camera;
    canvas: HTMLCanvasElement;
}
export class Environment extends BaseAsset implements IEnvironment {

    private objects : {[name:string]:MDTObject}= {};
    public  camera  : Camera;
    public  canvas  : HTMLCanvasElement; 

    public gl : WebGLRenderingContext;
    private origo : vec3 = [10,10,10];  

    public constructor( CallerID :String , canvas : HTMLCanvasElement ) {
        super();
        this.PRINTS_LOG_TO_CONSOLE = true;
        this.toConsole(CallerID+ " Constructor");
        
        this.canvas = canvas;  
        this.camera = new Camera(this);
        this.camera.transform.location =  [4,4,0] ;
         
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

    public addObject( key:string , geo : MDTFileMeshPrimitive ){
        this.objects[key] = new Mesh( this, [geo] , new StandardMaterial(this));
        this.objects[key].transform.location = this.origo;
    }
    
    public addObjects( key:string , geo : MDTFileMeshPrimitive[] ){
        this.objects[key] = new Mesh( this, geo , new StandardMaterial(this));
        this.objects[key].transform.location = this.origo;
    }

    public async renderFrame(){ 
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for(const key in this.objects){
            this.objects[key].draw();
        }
        this.camera.update();  
    }  
}