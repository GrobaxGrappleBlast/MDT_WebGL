import _vertexShaderCode    from './Mesh/Materials/shaders/VertexShader.glsl';
import _fragementShaderCode from './Mesh/Materials/shaders/FragmentShader.glsl' ; 
import { MDTGLTFLoader } from './Loader.ts/GLTFLoader';
import { MaterialBase } from './Mesh/Materials/MaterialBase';
import { Mesh } from './Mesh/Mesh';
import { Environment } from './Environment';

(window as any).MDTStart = (canvas : HTMLCanvasElement) :Core => {
    const MDTEngine = new Core(canvas);
    return MDTEngine;
}


export class Core {
    
    private environments : Environment[] = [];
    public  constructor(canvas : HTMLCanvasElement) {
        this.StartMDT( );
    }

    private async StartMDT( ){
        
        var mata = new MaterialBase(this.environments[0],_vertexShaderCode,_fragementShaderCode);  
        var load = new MDTGLTFLoader();
        var geometri = await load.Test("./public/3dAssets/storage/Box.gltf"); 
        var mesh = new Mesh(this.environments[0],geometri,mata); 
        this.Loop();
    }
    
    public Loop(){ 
        this.environments.forEach( p => p.renderFrame() )
        requestAnimationFrame(this.Loop.bind(this));
    } 
} 