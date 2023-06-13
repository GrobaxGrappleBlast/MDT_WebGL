import _vertexShaderSrc    from './RenderPassComb.vs.glsl'
import _fragementShaderSrc from './RenderPassComb.fs.glsl' 
import { MaterialBase } from "../MaterialBase";
import { Environment } from '../../../Environment';

export class RenderPassCombinator extends MaterialBase {

    protected _vertexPosition : number;  
    protected _framebufferLocation : WebGLUniformLocation ;  
    protected _textureSizeUniform : WebGLUniformLocation ;
 
    private vertexBuffer : WebGLBuffer; 
    private screenVerts  : Float32Array ;
    
    public constructor( env : Environment){
        super(env,_vertexShaderSrc,_fragementShaderSrc);
 
        this._vertexPosition        = this.gl.getAttribLocation (this.ShaderProgram,'a_position'); 
        this._framebufferLocation   = this.gl.getUniformLocation(this.ShaderProgram, "u_framebuffer");
        this._textureSizeUniform    = this.gl.getUniformLocation(this.ShaderProgram, "u_tex_size");
        this.screenVerts = new Float32Array([
           -1, -1,
            1, -1,
           -1,  1,
            1,  1,
        ]);
        this.vertexBuffer = this.createBuffer(this.environment.gl.ARRAY_BUFFER , this.environment.gl.STATIC_DRAW,this.screenVerts);
    }
     
    public renderCombinedPass ( diffusePass : WebGLTexture ){
        this.use();
        //this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.uniform2f(this._textureSizeUniform, this.gl.canvas.width,this.gl.canvas.height);

        this.bindBufferToAttribute( this.vertexBuffer, this._vertexPosition , this.environment.gl.ARRAY_BUFFER, 2, this.environment.gl.FLOAT);
        this.gl.uniform1i       (this._framebufferLocation, 0);
        this.gl.activeTexture   (this.gl.TEXTURE0);
        this.gl.bindTexture     (this.gl.TEXTURE_2D, diffusePass);
        
        this.gl.drawArrays(this.environment.gl.TRIANGLE_STRIP, 0, 4);
    } 

    public override use(): void {
        super.use(); 
    }

}