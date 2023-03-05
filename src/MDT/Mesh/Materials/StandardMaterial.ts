import _vertexShaderCode    from './shaders/VertexShader.glsl'
import _fragementShaderCode from './shaders/FragmentShader.glsl' 
import { MaterialBase } from './MaterialBase';
import { Environment, IEnvironment } from '../../Environment'; 
import { mat4 } from 'gl-matrix';

 

export class StandardMaterial extends MaterialBase{
 

    // Vertex Shader
    private _vertPosition : number = null;
    public override get vertexPosition(){ return this._vertPosition; }
    
    private _cameraMatrixUniformLocation : WebGLUniformLocation = null ; 
    public get cameraMatrixUniformLocation(){ return this._cameraMatrixUniformLocation; }

    private _objectTransformMatrixUniformLocation : WebGLUniformLocation = null ; 
    public get objectTransformMatrixUniformLocation(){ return this._objectTransformMatrixUniformLocation; }

    // Fragment Shader
    private _diffuseColor : WebGLUniformLocation = null ; 
    public get diffuseColorUniformLocation(){ return this._diffuseColor; }

    public constructor( env : IEnvironment){
        super(env,_vertexShaderCode,_fragementShaderCode);

        // Vertex Shader
        this._vertPosition = this.gl.getAttribLocation (this.ShaderProgram,'vertPosition');
        this._cameraMatrixUniformLocation           = this.gl.getUniformLocation(this.ShaderProgram, "matrix_view");
        this._objectTransformMatrixUniformLocation  = this.gl.getUniformLocation(this.ShaderProgram, "matrix_transform");

        // Fragment Shader
        this._diffuseColor = this.gl.getUniformLocation(this.ShaderProgram,'fragColor')
        
    }
    
    public override use(): void {
        super.use();
        //this.gl.uniformMatrix4fv( this._cameraMatrixUniformLocation, false, this.environment.mainCamera.cameraMatrix.getDataArray() );
       // this.gl.uniform3fv(this.diffuseColorUniformLocation         , new Float32Array(this.DiffuseColor._data));

        // Camera and World Matrices 

        const matrix = mat4.create();
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, 
            75 * Math.PI/180, // vertical field-of-view (angle, radians)
            0.5, // aspect W/H
            1e-4, // near cull distance
            1e4 // far cull distance
        );
        
        const finalMatrix = mat4.create();
        
        
        mat4.translate  ( matrix     , matrix          , [.1, .5, -2]   );
        mat4.rotateZ    ( matrix     , matrix          , Math.PI/2 / 70 );
        mat4.multiply   ( finalMatrix, projectionMatrix, matrix         );
        //console.log("0:::"+finalMatrix.toString() + "\n1:::" + this.environment.camera.cameraMatrix.toString() );

         
        this.gl.uniformMatrix4fv(this._cameraMatrixUniformLocation, false,
            finalMatrix
        );
    }
} 