
 
import { Environment, IEnvironment } from './Environment'; 
import _vertexShaderCode    from './Mesh/Materials/shaders/VertexShader.glsl'
import _fragementShaderCode from './Mesh/Materials/shaders/FragmentShader.glsl'  
import { Loader } from '../FileLoading/Loader';
import { mat4 } from 'gl-matrix'; 
import { MDTFileMeshPrimitive } from '../FileLoading/LoadedFile/MDTFile'; 
import { AccessorComponentType } from '../FileLoading/GLTF/Interface/IGLTFAccessor';
import { MDTBufferMaker } from '../FileLoading/LoadedFile/MDTBuffer';


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

        var env = new Environment("Core",canvas);
        var MeshPrimitives: MDTFileMeshPrimitive[] = [];
 
        var Model = await loader.loadModel('./public/3dAssets/storage/baseStand.gltf');
        Model.meshes.forEach( m =>{
            m.primitives.forEach(p=>{
                MeshPrimitives.push(p);
            })
        }) 

        env.addObjects("first Loaded",MeshPrimitives);
        this.environments.push( env  );
        this.Loop();
    }
    public Loop(){ 
        this.environments.forEach( p => p.renderFrameToFrameBuffer() )
        requestAnimationFrame(this.Loop.bind(this)); 
    } 
} 