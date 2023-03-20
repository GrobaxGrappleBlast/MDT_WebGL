
 
import { Environment, IEnvironment } from './Environment'; 
import _vertexShaderCode    from './Mesh/Materials/shaders/VertexShader.glsl'
import _fragementShaderCode from './Mesh/Materials/shaders/FragmentShader.glsl' 
import { StandardMaterial } from './Mesh/Materials/StandardMaterial'; 
import { Mesh } from './Mesh/Mesh';  
import { RawGeometri } from './Mesh/Geometri/RawGeometri';
import { Loader } from '../FileLoading/Loader';
import { mat4 } from 'gl-matrix';


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
          
        var geometries :RawGeometri[] = [] ;///= //await loader.loadModel('./public/3dAssets/storage/TEST.gltf');
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
        geometries.push(new RawGeometri(new Float32Array(positions) , new Uint16Array(indices) ,null))
        env.addObjects("firstLoaded",geometries);

        console.log(geometries);

        this.environments.push( env  );
        this.Loop();
    }
 

    public Loop(){ 

        // requestAnimationFrame(this.Loop.bind(this));
        // mat4.rotateZ(this.matrix, this.matrix, Math.PI/2 / 70);
        // mat4.rotateX(this.matrix, this.matrix, 0.09);
        //
        //  mat4.multiply(this.finalMatrix, this.projectionMatrix, this.matrix);
        //  this.gl.uniformMatrix4fv(this.uniformLocations, false, this.finalMatrix);
        //  this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexData.length / 3);

        this.environments.forEach( p => p.renderFrame() )
        requestAnimationFrame(this.Loop.bind(this));
    } 
} 