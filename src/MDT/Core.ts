
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

export class Core implements IEnvironment{
    
    private environments : Environment[] = []; 
    public  constructor(canvas : HTMLCanvasElement) { 
        this.StartMDT( canvas );
    }

    public gl : WebGLRenderingContext;
    public vertexShader     : WebGLShader ;
    public fragmentShader   : WebGLShader ;
    public ShaderProgram    : WebGLProgram; 

    private async StartMDT(canvas : HTMLCanvasElement ){ 
         
        var gl = canvas.getContext('experimental-webgl') as WebGLRenderingContext;
        this.gl = gl;
        /* Step2: Define the geometry and store it in buffer objects */

        // // Create a new buffer object
        // var vertex_buffer = gl.createBuffer();
        // // Bind an empty array buffer to it
        // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        // // Pass the vertices data to the buffer
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        // // Unbind the buffer
        // gl.bindBuffer(gl.ARRAY_BUFFER, null);

         /* Step3: Create and compile Shader programs */
        var vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];
        var geometri = new MDTGeometri(new Float32Array(vertices),null,null);
        
        // --- REVERCING THAT PROGRAM 
        var material = new StandardMaterial(this);
        var shaderProgram = material.ShaderProgram;
        //gl.useProgram(shaderProgram);
        //material.use();

        var mesh = new Mesh(this,geometri,material);
        mesh.draw();

         /* Step 4: Associate the shader programs to buffer objects */
         //Bind vertex buffer object
       
        
        /* Step5: Drawing the required object (triangle) */
        // Clear the canvas
        gl.clearColor(0.5, 0.5, 0.5, 0.9);
        // Enable the depth test
        gl.enable(gl.DEPTH_TEST); 
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Set the view port
        gl.viewport(0,0,canvas.width,canvas.height);
        // Draw the triangle
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        //
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
        //this.environments.forEach( p => p.renderFrame() )
        //requestAnimationFrame(this.Loop.bind(this));
    } 
} 