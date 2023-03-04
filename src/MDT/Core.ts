
import { MDTGLTFLoader } from './Loader.ts/GLTFLoader';  
import { Environment, IEnvironment } from './Environment'; 
import _vertexShaderCode    from './Mesh/Materials/shaders/VertexShader.glsl'
import _fragementShaderCode from './Mesh/Materials/shaders/FragmentShader.glsl' 
import { StandardMaterial } from './Mesh/Materials/StandardMaterial';
import { MDTGeometri } from './Mesh/Geometri/MDTGeometri';
import { Mesh } from './Mesh/Mesh';


(window as any).MDTStart = (canvas : HTMLCanvasElement) :Core => {
    const MDTEngine = new Core(canvas);
    return MDTEngine;
}

export class Core{
    
    private environments : Environment[] = []; 
    public  constructor(canvas : HTMLCanvasElement) { 
        this.StartMDT( canvas );
    }

   

    private async StartMDT(canvas : HTMLCanvasElement ){ 
        
        var geometri = new MDTGeometri(new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,]),null,null);
        var geometri2= new MDTGeometri(new Float32Array([-0.5, 0.5,  0.5,  0.5, 0.5,  0.0,]),null,null);


        var env = new Environment("Core",canvas);
        env.addObject("tri1",geometri );
        env.addObject("tri2",geometri2);
        this.environments.push( env  );

        this.Loop();
        // 
        // this.gl.clearColor   (0.5, 0.5, 0.5, 0.9);
        // this.gl.enable       (this.gl.DEPTH_TEST); 
        // this.gl.clear        (this.gl.COLOR_BUFFER_BIT);
        // this.gl.viewport     (0,0,canvas.width,canvas.height);
        // 
        //mesh.draw();
        //mesh2.draw();
         
                /*
        this.gl = canvas.getContext("webgl");
        this.gl.clearColor(0.3,0.3,0.3,0.9);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.vertexShader   = this.gl.createShader(this.gl.VERTEX_SHADER  );
        this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

        this.gl.shaderSource(this.vertexShader    , _vertexShaderCode      );
        this.gl.shaderSource(this.fragmentShader  , _fragementShaderCode    );

        this.gl.compileShader(this.vertexShader);
        if(!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)){
            console.error("ERROR Compiling Vertex Shader!"      , this.gl.getShaderInfoLog(this.vertexShader) );
            return;
        }  
        this.gl.compileShader(this.fragmentShader);
        if(!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)){
            console.error("ERROR Compiling Fragment Shader!"    , this.gl.getShaderInfoLog(this.fragmentShader) );
            return;
        }

        this.ShaderProgram   = this.gl.createProgram();
        this.gl.attachShader(this.ShaderProgram,this.vertexShader  );
        this.gl.attachShader(this.ShaderProgram,this.fragmentShader);

        this.gl.linkProgram(this.ShaderProgram);
        if(!this.gl.getProgramParameter(this.ShaderProgram,this.gl.LINK_STATUS)){
            console.error("Error Linking Program!" );
            console.error(this.gl.getProgramInfoLog(this.ShaderProgram));
            return;
        }

        // -- MATERIAL CODE ENDS 
        const vertices = [  
            // Front face
              -1.0, -1.0,  1.0,   1.0, -1.0,  1.0,   1.0,  1.0,  1.0,  -1.0,  1.0,  1.0,  
            // Back face
              -1.0, -1.0, -1.0,   1.0, -1.0, -1.0,   1.0,  1.0, -1.0,  -1.0,  1.0, -1.0,
            ];

        // Set up the WebGL context and shaders
        this.gl.useProgram(this.ShaderProgram);
        // Create a buffer for the vertex data and upload the vertex coordinates
        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        // Set up the vertex attribute pointers and enable the vertex shader
        const positionAttribute = this.gl.getAttribLocation(this.ShaderProgram, 'vertPosition');
        this.gl.enableVertexAttribArray(positionAttribute);
        this.gl.vertexAttribPointer(positionAttribute, 3, this.gl.FLOAT, false, 0, 0);

        // Set the viewport and clear the canvas
        this.gl.viewport(0, 0, canvas.width, canvas.height); 

        // Draw the cube as a point cloud
        this.gl.drawArrays(this.gl.POINTS, 0, vertices.length / 3);

            */
    }
    
    public Loop(){ 
        this.environments.forEach( p => p.renderFrame() )
        //requestAnimationFrame(this.Loop.bind(this));
    } 
} 