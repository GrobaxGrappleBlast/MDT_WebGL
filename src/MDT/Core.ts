import _vertexShaderCode    from './Mesh/Materials/shaders/VertexShader.glsl';
import _fragementShaderCode from './Mesh/Materials/shaders/FragmentShader.glsl' ; 
import { MDTGLTFLoader } from './Loader.ts/GLTFLoader';
import { MaterialBase } from './Mesh/Materials/MaterialBase';
import { Mesh } from './Mesh/Mesh';

(window as any).MDTStart = (canvas : HTMLCanvasElement) :Core => {
    const MDTEngine = new Core(canvas);
    return MDTEngine;
}
 
 

export var gl : WebGLRenderingContext = (window as any).gl;

export class Core {

    
    private canvas : HTMLCanvasElement;  
    public  constructor(canvas : HTMLCanvasElement) {
    
        this.canvas = canvas;  
        gl = this.canvas.getContext('webgl');
        if(!gl){
            alert(
            `Your Browser Does not support WebGl, And therefore the app cannot play.
            Please try again using a different Browser (A browser is a program such
            a Google Chrome, Firefox, Microsoft Edge and others.)`                  );
        } 
        gl.clearColor(0.3,0.3,0.3,0.9);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 
        var res = this.initialize();
    }
 
    public mesh:Mesh;
    public async initialize(){
        var mata = new MaterialBase(_vertexShaderCode,_fragementShaderCode);  
        var load = new MDTGLTFLoader();
        var geometri = await load.Test("asd");

        this.mesh = new Mesh(geometri,mata);
        this.StartMDT( );
    }

    public StartMDT( ){
        this.Loop();
    }
    
    public Loop(){

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        if(this.mesh != undefined || this.mesh != null){
            this.mesh.draw(); 
        }
        requestAnimationFrame(this.Loop.bind(this));
    }




    public static radToDeg(r: number) {
        return r * 180 / Math.PI;
    }
    
    public static degToRad(d: number) {
    return d * Math.PI / 180;
    }
} 