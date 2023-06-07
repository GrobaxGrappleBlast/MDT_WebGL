import _vertexShaderCode    from './shaders/VertexShader.glsl'
import _fragementShaderCode from './shaders/FragmentShader.glsl' 
import { MaterialBase } from './MaterialBase';
import { Environment, IEnvironment } from '../../Environment'; 
import { mat4 } from 'gl-matrix';

 
abstract class standarMaterialAttributeDeclarations extends MaterialBase { 

    // Vertex

    protected _vertexPosition : number = null;
    public get vertexPosition(){ return this._vertexPosition; } 

    protected _vertexNormals : number = null;
    public get vertexNormals(){ return this._vertexNormals; } 

    protected _vertexUVCoords1 : number = null;
    public get vertexUVCoords1(){ return this._vertexUVCoords1; } 

    protected _vertexUVCoords2 : number = null;
    public get vertexUVCoords2(){ return this._vertexUVCoords2; } 


    protected _vertexTangent : number = null;
    public get vertexTangent(){ return this._vertexTangent; } 

    // DiffuseColor 
    protected _diffuseColor : WebGLUniformLocation = null ; 
    public get diffuseColor(){ return this._diffuseColor; }
 
    
}
abstract class standarMaterialUniformDeclarations extends standarMaterialAttributeDeclarations { 

    //Projection Matrix    
    protected _matrix_projection : WebGLUniformLocation = null ; 
    public get matrixProjection(){ return this._matrix_projection; }

    //Camera Projection Matrix    
    protected _matrix_cameraView : WebGLUniformLocation = null ; 
    public get matrixCameraView(){ return this._matrix_cameraView; }

    // Object Transform Matrix
    protected _objectTransformMatrixUniformLocation : WebGLUniformLocation = null ; 
    public get objectTransformMatrixUniformLocation(){ return this._objectTransformMatrixUniformLocation; }
 
}

export class StandardMaterial extends standarMaterialUniformDeclarations {
 

    public constructor( env : IEnvironment){
        super(env,_vertexShaderCode,_fragementShaderCode);

        // Uniforms  
        this._matrix_cameraView                     = this.gl.getUniformLocation(this.ShaderProgram, "matrix_view");
        this._matrix_projection                     = this.gl.getUniformLocation(this.ShaderProgram, "matrix_projection");
        this._objectTransformMatrixUniformLocation  = this.gl.getUniformLocation(this.ShaderProgram, "matrix_model");

        // Attributes 
        this._vertexPosition    = this.gl.getAttribLocation (this.ShaderProgram,'position'); 
        this._vertexNormals     = this.gl.getAttribLocation (this.ShaderProgram,'normal'); 
        this._vertexUVCoords1   = this.gl.getAttribLocation (this.ShaderProgram,'texCoord1');
        this._vertexUVCoords2   = this.gl.getAttribLocation (this.ShaderProgram,'texCoord2');
        this._vertexTangent     = this.gl.getAttribLocation (this.ShaderProgram,'tangent');   

        // Render Specifics
        this._diffuseColor = this.gl.getUniformLocation(this.ShaderProgram,'fragColor');
    }
    
     
    public override use(): void {
        super.use(); 
    }
} 