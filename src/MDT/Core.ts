 
(window as any).MDTStart = (canvas : HTMLCanvasElement) :Core => {
    const MDTEngine = new Core(canvas);
    return MDTEngine;
}
 
export var gl : WebGLRenderingContext = (window as any).gl;

export class Core {

    
    private canvas : HTMLCanvasElement;  
    public  constructor(canvas : HTMLCanvasElement) {

        this.canvas = canvas;  
        gl = this.canvas.getContext('webgl');
        if(!gl){
            alert("Your Browser Does not support WebGl, And therefore the app cannot play. Please try again using a different Browser (A browser is a program such a Google Chrome, Firefox, Microsoft Edge and others.) ");
        } 
        
        gl.clearColor(0.3,0.3,0.3,0.9);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        var VertexShader    = gl.createShader(gl.VERTEX_SHADER);
        var FragmentShader  = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(VertexShader    ,'./shaders/VertexShader.glsl'  );
        gl.shaderSource(FragmentShader  ,'./shaders/FragmentShader.glsl');

        var ShaderProgram   = gl.createProgram();
        gl.attachShader(ShaderProgram,VertexShader  );
        gl.attachShader(ShaderProgram,FragmentShader);
        gl.linkProgram(ShaderProgram);

        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        //                  Linking Program - means Something, But it cant run without 
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        if(!gl.getProgramParameter(ShaderProgram,gl.LINK_STATUS)){
            console.error("Error Linking Program!", gl.getProgramInfoLog(ShaderProgram) )
            return;
        }

        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        //                  Validating Program - if there is a compile error in the program
        // --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
        // @ts-ignore
        if(import.meta.env.VITE_ISDevelopment != undefined && import.meta.env.VITE_ISDevelopment == true ){
            gl.validateProgram(ShaderProgram);
            if(!gl.getProgramParameter(ShaderProgram,gl.VALIDATE_STATUS)){
                console.error("Error Validating Program!", gl.getProgramInfoLog(ShaderProgram) );
            }
        }



    }
 
    public StartMDT( ){
        this.Loop();
    }
    
    public Loop(){
        requestAnimationFrame(this.Loop.bind(this));
    }

} 