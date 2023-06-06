import _vertexShaderCode    from './shaders/VertexShader.glsl'
import _fragementShaderCode from './shaders/FragmentShader.glsl' 
import { MaterialBase } from './MaterialBase';
import { Environment, IEnvironment } from '../../Environment'; 
import { mat4 } from 'gl-matrix';

 

export class StandardMaterial extends MaterialBase{
 

    // Uniforms
    // Uniforms are variables that are passed from the CPU to the GPU.
    
    //Projection Matrix    
    private _matrix_projection : WebGLUniformLocation = null ; 
    public get matrixProjection(){ return this._matrix_projection; }

    //Camera Projection Matrix    
    private _matrix_cameraView : WebGLUniformLocation = null ; 
    public get matrixCameraView(){ return this._matrix_cameraView; }

    // Object Transform Matrix
    private _objectTransformMatrixUniformLocation : WebGLUniformLocation = null ; 
    public get objectTransformMatrixUniformLocation(){ return this._objectTransformMatrixUniformLocation; }

    // Object Transform Matrix
    private _ScreenSize : WebGLUniformLocation = null;  


    // Attributes
    // Attributes are variables that are passed from the CPU to the GPU.

    // Vertex Position
    private _vertPosition : number = null;
    public override get vertexPosition(){ return this._vertPosition; }

    private _vertexNormals : number = null;
    public override get vertexNormals(){ return this._vertexNormals; }

    // DiffuseColor 
    private _diffuseColor : WebGLUniformLocation = null ; 
    public get diffuseColorUniformLocation(){ return this._diffuseColor; }
 

    public constructor( env : IEnvironment){
        super(env,_vertexShaderCode,_fragementShaderCode);

        // Uniforms  
        this._ScreenSize                            = this.gl.getUniformLocation(this.ShaderProgram, "screenSize");
        this._matrix_cameraView                     = this.gl.getUniformLocation(this.ShaderProgram, "matrix_view");
        this._matrix_projection                     = this.gl.getUniformLocation(this.ShaderProgram, "matrix_projection");
        this._objectTransformMatrixUniformLocation  = this.gl.getUniformLocation(this.ShaderProgram, "matrix_model");

        // Attributes 
        //this._diffuseColor = this.gl.getUniformLocation(this.ShaderProgram,'fragColor');
        this._vertPosition = this.gl.getAttribLocation (this.ShaderProgram,'position'); 
        this._vertexNormals= this.gl.getAttribLocation (this.ShaderProgram,'normal'); 
    }
    
    private first = true;
    public override use( ): void {
        super.use();
        this.gl.uniformMatrix4fv(this._ScreenSize, false , new Float32Array( this.environment.getScreenSize() ) );

        //this.gl.uniformMatrix4fv( this._cameraMatrixUniformLocation, false, this.environment.mainCamera.cameraMatrix.getDataArray() );
        // this.gl.uniform3fv(this.diffuseColorUniformLocation         , new Float32Array(this.DiffuseColor._data));
        // Camera and World Matrices 

    }
} 