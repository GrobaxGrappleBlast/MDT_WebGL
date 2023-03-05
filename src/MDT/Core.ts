
 
import { Environment, IEnvironment } from './Environment'; 
import _vertexShaderCode    from './Mesh/Materials/shaders/VertexShader.glsl'
import _fragementShaderCode from './Mesh/Materials/shaders/FragmentShader.glsl' 
import { StandardMaterial } from './Mesh/Materials/StandardMaterial'; 
import { Mesh } from './Mesh/Mesh';
import { GltfLoader } from 'gltf-loader-ts';
import { MDTGLTFLoader } from '../MDTGLTF/Loader/GLTF/MDTGLTFLoader';
import { RawGeometri } from './Mesh/Geometri/RawGeometri';
import { Loader } from '../MDTGLTF/Loader';


(window as any).MDTStart = (canvas : HTMLCanvasElement) :Core => {
    const MDTEngine = new Core(canvas);
    return MDTEngine;
}

export const loader : Loader = new Loader();
export class Core{
    
    private environments : Environment[] = []; 
    public  constructor(canvas : HTMLCanvasElement) { 
        this.StartMDT( canvas );
    } 
    private async StartMDT(canvas : HTMLCanvasElement ){ 
         
        var geometri = new RawGeometri(new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,]),null,null);
        var geometri2= new RawGeometri(new Float32Array([-0.5, 0.5,  0.5,  0.5, 0.5,  0.0,]),null,null);

        var env = new Environment("Core",canvas);
        env.addObject("tri1",geometri );
        env.addObject("tri2",geometri2);
         

        var geometries = await loader.loadModel('./public/3dAssets/storage/model.gltf');
        env.addObjects("firstLoaded",geometries);

        this.environments.push( env  );
        this.Loop();
    }
 
    public Loop(){ 
        this.environments.forEach( p => p.renderFrame() )
        //requestAnimationFrame(this.Loop.bind(this));
    } 
} 