import _vertexShaderCode    from './shaders/VertexShader.glsl'
import _fragementShaderCode from './shaders/FragmentShader.glsl'
import { StandardMaterial } from './Materials/StandardMaterial';
import { GLTFLoader } from './Loader.ts/GLTFLoader';

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

        var mat = new StandardMaterial();
        var load = new GLTFLoader();

        
        load.Test("asd");
    }
 
    public StartMDT( ){
        this.Loop();
    }
    
    public Loop(){
        requestAnimationFrame(this.Loop.bind(this));
    }

} 