import _vertexShaderCode    from './shaders/VertexShader.glsl'
import _fragementShaderCode from './shaders/FragmentShader.glsl' 
import { MaterialBase } from './MaterialBase';
import { Environment } from '../../Environment'; 
 

export class StandardMaterial extends MaterialBase{

    private _vertPosition : number = null;
    public get vertexPosition(){ return this._vertPosition; }
    
    private _cameraMatrixUniformLocation : WebGLUniformLocation = null ; 
    public get cameraMatrixUniformLocation(){ return this._cameraMatrixUniformLocation; }

    public constructor( env : Environment){
        super(env,_vertexShaderCode,_fragementShaderCode);
        this._vertPosition = this.gl.getAttribLocation (this.ShaderProgram,'vertPosition');
        this._cameraMatrixUniformLocation = this.gl.getUniformLocation(this.ShaderProgram, "u_cameraMatrix");
    }
    
    public override use(): void {
        this.gl.uniformMatrix4fv( this._cameraMatrixUniformLocation, false, this.environment.mainCamera.cameraMatrix.getDataArray() );
        super.use();
    }
} 