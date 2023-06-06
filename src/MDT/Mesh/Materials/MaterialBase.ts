import { Environment, IEnvironment } from "../../Environment";
import { GlAsset } from "../../Objects/Object";



export abstract class MaterialBase extends GlAsset {

    public vertexShader     : WebGLShader ;
    public fragmentShader   : WebGLShader ;
    public ShaderProgram    : WebGLProgram; 

    public abstract get vertexPosition(): number;
    public abstract get vertexNormals(): number;

    public constructor(env:IEnvironment , vertexShadercode : string, fragmentShadercode:string){
        super(env);
        this.vertexShader   = env.gl.createShader(env.gl.VERTEX_SHADER  );
        this.fragmentShader = env.gl.createShader(env.gl.FRAGMENT_SHADER);

        env.gl.shaderSource(this.vertexShader    , vertexShadercode      );
        env.gl.shaderSource(this.fragmentShader  , fragmentShadercode    );

        env.gl.compileShader(this.vertexShader);
        if(!env.gl.getShaderParameter(this.vertexShader, env.gl.COMPILE_STATUS)){
            console.error("ERROR Compiling Vertex Shader!"      , env.gl.getShaderInfoLog(this.vertexShader) );
            return;
        }  

        env.gl.compileShader(this.fragmentShader);
        if(!env.gl.getShaderParameter(this.fragmentShader, env.gl.COMPILE_STATUS)){
            console.error("ERROR Compiling Fragment Shader!"    , env.gl.getShaderInfoLog(this.fragmentShader) );
            return;
        }

        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        // Linking Program - means Combinig Vertex and Fragment Shader into the same Program 
        // If it doesent work, there are inconsistencyes between the two programs. 
        // or perhaps to size limits where exeded when they were combined. 
        // see https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glLinkProgram.xml
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        this.ShaderProgram   = env.gl.createProgram();
        env.gl.attachShader(this.ShaderProgram,this.vertexShader  );
        env.gl.attachShader(this.ShaderProgram,this.fragmentShader);

        env.gl.linkProgram(this.ShaderProgram);
        if(!env.gl.getProgramParameter(this.ShaderProgram,env.gl.LINK_STATUS)){
            console.error("Error Linking Program!" );
            console.error(env.gl.getProgramInfoLog(this.ShaderProgram));
            return;
        }

        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        //                  Validating Program - if there is a compile error in the program
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        // @ts-ignore
        //if(import.meta.env.VITE_ISDevelopment != undefined && import.meta.env.VITE_ISDevelopment == true ){
            env.gl.validateProgram(this.ShaderProgram);
            if(!env.gl.getProgramParameter(this.ShaderProgram,env.gl.VALIDATE_STATUS)){
                console.error("Error Validating Program!", env.gl.getProgramInfoLog(this.ShaderProgram) );
            }
        //}
        this.environment = env;
    }

    protected toShaderProgram( shaderSetting : ((program : WebGLProgram) => any) ){
        shaderSetting(this.ShaderProgram);
    }

    public use(){ 
          
        this.environment.gl.useProgram(this.ShaderProgram);
        
    }
} 