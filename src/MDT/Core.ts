
 
import { Environment, IEnvironment } from './Environment'; 
import _vertexShaderCode    from './Mesh/Materials/shaders/VertexShader.glsl'
import _fragementShaderCode from './Mesh/Materials/shaders/FragmentShader.glsl' 
import { StandardMaterial } from './Mesh/Materials/StandardMaterial'; 
import { Mesh } from './Mesh/Mesh';
import { GltfLoader } from 'gltf-loader-ts';
import { MDTGLTFLoader } from '../MDTGLTF/Loader/GLTF/MDTGLTFLoader';
import { RawGeometri } from './Mesh/Geometri/RawGeometri';
import { Loader } from '../MDTGLTF/Loader';
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


        var geometri = new RawGeometri(new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,]),null,null);
        var geometri2= new RawGeometri(new Float32Array([-0.5, 0.5,  0.5,  0.5, 0.5,  0.0,]),null,null);
        var geometri3= new RawGeometri( new Float32Array([

            // Front
            0.1, 0.1, 0.1,
            0.1, -.1, 0.1,
            -.1, 0.1, 0.1,
            -.1, 0.1, 0.1,
            0.1, -.1, 0.1,
            -.1, -.1, 0.1,
        
            // Left
            -.1, 0.1, 0.1,
            -.1, -.1, 0.1,
            -.1, 0.1, -.1,
            -.1, 0.1, -.1,
            -.1, -.1, 0.1,
            -.1, -.1, -.1,
        
            // Back
            -.1, 0.1, -.1,
            -.1, -.1, -.1,
            0.1, 0.1, -.1,
            0.1, 0.1, -.1,
            -.1, -.1, -.1,
            0.1, -.1, -.1,
        
            // Right
            0.1, 0.1, -.1,
            0.1, -.1, -.1,
            0.1, 0.1, 0.1,
            0.1, 0.1, 0.1,
            0.1, -.1, 0.1,
            0.1, -.1, -.1,
        
            // Top
            0.1, 0.1, 0.1,
            0.1, 0.1, -.1,
            -.1, 0.1, 0.1,
            -.1, 0.1, 0.1,
            0.1, 0.1, -.1,
            -.1, 0.1, -.1,
        
            // Bottom
            0.1, -.1, 0.1,
            0.1, -.1, -.1,
            -.1, -.1, 0.1,
            -.1, -.1, 0.1,
            0.1, -.1, -.1,
            -.1, -.1, -.1,
        ]),null,null);


        var env = new Environment("Core",canvas);
        env.addObject("tri1",geometri );
        env.addObject("tri2",geometri2);
        env.addObject("box",geometri3);
         
        //var geometries = await loader.loadModel('./public/3dAssets/storage/model.gltf');
        //env.addObjects("firstLoaded",geometries);
//
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