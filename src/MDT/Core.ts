
 
import { Environment, IEnvironment } from './Environment'; 
import _vertexShaderCode    from './Mesh/Materials/shaders/VertexShader.glsl'
import _fragementShaderCode from './Mesh/Materials/shaders/FragmentShader.glsl' 
import { StandardMaterial } from './Mesh/Materials/StandardMaterial';
import { MDTGeometri } from './Mesh/Geometri/MDTGeometri';
import { Mesh } from './Mesh/Mesh';
import { GltfLoader } from 'gltf-loader-ts';
import { MDTGLTFLoader } from '../MDTGLTF/Loader/GLTF/MDTGLTFLoader';


(window as any).MDTStart = (canvas : HTMLCanvasElement) :Core => {
    const MDTEngine = new Core(canvas);
    return MDTEngine;
}

export class Core{
    
    private environments : Environment[] = []; 
    public  constructor(canvas : HTMLCanvasElement) { 
        this.StartMDT( canvas );
    } 
    private async StartMDT(canvas : HTMLCanvasElement ){ 
        
         
        var geometri = new MDTGeometri(new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,]),null,null);
        var geometri2= new MDTGeometri(new Float32Array([-0.5, 0.5,  0.5,  0.5, 0.5,  0.0,]),null,null);

        var env = new Environment("Core",canvas);
        env.addObject("tri1",geometri );
        env.addObject("tri2",geometri2);
        this.environments.push( env  ); 

        var data = await MDTGLTFLoader.loadGLTFFileAsync('./public/3dAssets/storage/model.gltf');
        console.log("STOP HER");
        //let a = await MDTGLTFLoader.loadGLTFFileAsync();

        this.Loop();
    }


 
    public Loop(){ 
        this.environments.forEach( p => p.renderFrame() )
        //requestAnimationFrame(this.Loop.bind(this));
    } 
} 