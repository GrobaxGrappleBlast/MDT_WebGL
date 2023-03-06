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
    
    private first = true;
    public override use(): void {
        super.use();
        // this.gl.uniformMatrix4fv( this._cameraMatrixUniformLocation, false, this.environment.mainCamera.cameraMatrix.getDataArray() );
        // this.gl.uniform3fv(this.diffuseColorUniformLocation         , new Float32Array(this.DiffuseColor._data));
        // Camera and World Matrices 

    }
} 