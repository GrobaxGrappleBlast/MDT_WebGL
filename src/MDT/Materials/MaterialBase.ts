import { gl } from '../Core';


export class MaterialBase {

    public vertexShader     : WebGLShader;
    public fragmentShader   : WebGLShader;
    public ShaderProgram    : WebGLProgram;

    public constructor(vertexShadercode : string, fragmentShadercode:string){
      
        this.vertexShader   = gl.createShader(gl.VERTEX_SHADER  );
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(this.vertexShader    , vertexShadercode      );
        gl.shaderSource(this.fragmentShader  , fragmentShadercode    );

        gl.compileShader(this.vertexShader);
        if(!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)){
            console.error("ERROR Compiling Vertex Shader!"      , gl.getShaderInfoLog(this.vertexShader) );
            return;
        }  

        gl.compileShader(this.fragmentShader);
        if(!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)){
            console.error("ERROR Compiling Fragment Shader!"    , gl.getShaderInfoLog(this.fragmentShader) );
            return;
        }

        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        // Linking Program - means Combinig Vertex and Fragment Shader into the same Program 
        // If it doesent work, there are inconsistencyes between the two programs. 
        // or perhaps to size limits where exeded when they were combined. 
        // see https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glLinkProgram.xml
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

        this.ShaderProgram   = gl.createProgram();
        gl.attachShader(this.ShaderProgram,this.vertexShader  );
        gl.attachShader(this.ShaderProgram,this.fragmentShader);

        gl.linkProgram(this.ShaderProgram);
        if(!gl.getProgramParameter(this.ShaderProgram,gl.LINK_STATUS)){
            console.error("Error Linking Program!" );
            console.error(gl.getProgramInfoLog(this.ShaderProgram));
            return;
        }

        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        //                  Validating Program - if there is a compile error in the program
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        // @ts-ignore
        if(import.meta.env.VITE_ISDevelopment != undefined && import.meta.env.VITE_ISDevelopment == true ){
            gl.validateProgram(this.ShaderProgram);
            if(!gl.getProgramParameter(this.ShaderProgram,gl.VALIDATE_STATUS)){
                console.error("Error Validating Program!", gl.getProgramInfoLog(this.ShaderProgram) );
            }
        }
    }

    public toShaderProgram( shaderSetting : ((program : WebGLProgram) => any) ){
        shaderSetting.call(this.ShaderProgram, this.ShaderProgram);
    }

    public use(){
        gl.useProgram(this.ShaderProgram);
    }
} 