
 
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

    public gl : WebGLRenderingContext;
    public finalMatrix:mat4;
    public projectionMatrix:mat4;
    public matrix:mat4;
    public vertexData: number[];
    public uniformLocations : WebGLUniformLocation;


    private async StartMDT(canvas : HTMLCanvasElement ){ 

 
        var env = new Environment("Core",canvas);
        var MeshPrimitives: MDTFileMeshPrimitive[] = [];
        /*
        var Model = await loader.loadModel('./public/3dAssets/storage/TEST.gltf');
        Model.meshes.forEach( m =>{
            m.primitives.forEach(p=>{
                MeshPrimitives.push(p);
            })
        })
        */
        const positions = [
            // Front face
            -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
          
            // Back face
            -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
          
            // Top face
            -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
          
            // Bottom face
            -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
          
            // Right face
            1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
          
            // Left face
            -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
        ];
        const indices = [
        0,
        1,
        2,
        0,
        2,
        3, // front
        4,
        5,
        6,
        4,
        6,
        7, // back
        8,
        9,
        10,
        8,
        10,
        11, // top
        12,
        13,
        14,
        12,
        14,
        15, // bottom
        16,
        17,
        18,
        16,
        18,
        19, // right
        20,
        21,
        22,
        20,
        22,
        23, // left
        ];

        console.log("STOP HER")
        var m = new MDTFileMeshPrimitive();
        m.buffers.POSITION = MDTBufferMaker.createRAWBuffer(AccessorComponentType.FLOAT         , positions , "RAW MADE BUFFERS");
        m.buffers.INDICIES = MDTBufferMaker.createRAWBuffer(AccessorComponentType.SHORT  , indices   , "RAW MADE BUFFERS");
        m.name = "MANUAL MODEL"

        MeshPrimitives.push(m);
        env.addObjects("firstLoaded",MeshPrimitives);
 
        this.environments.push( env  );
        this.Loop();
    }
    public Loop(){ 
        this.environments.forEach( p => p.renderFrame() )
        requestAnimationFrame(this.Loop.bind(this));
    } 
} 