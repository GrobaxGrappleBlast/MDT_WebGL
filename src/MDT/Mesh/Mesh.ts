import { Environment, IEnvironment } from "../Environment";
import { MDTObject } from "../Objects/Object";
import { MDTGeometri } from "./Geometri/MDTGeometri"; 
import { StandardMaterial } from "./Materials/StandardMaterial";


export class Mesh extends MDTObject{
    
    private Geometri : MDTGeometri;
    public  Material : StandardMaterial;  
    private vertexBuffer: WebGLBuffer = null;

    public constructor(environment:IEnvironment,Geometri : MDTGeometri,Material : StandardMaterial){
            super(environment);
            this.Material = Material;
            this.Geometri = Geometri;
            this.CreateBuffers();
        /*
        var triangle = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, triangle);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.Geometri.Verticies ,this.gl.STATIC_DRAW);

        this.Material.toShaderProgram( (p) => { 
            var position = this.gl.getAttribLocation (p,'vertPosition');
            //var color = gl.getAttribLocation    (p,'vertColor');
            this.gl.vertexAttribPointer( 
                position,
                2,
                this.gl.FLOAT,
                false,
                2 * Float32Array.BYTES_PER_ELEMENT,
                0
            );
            this.gl.enableVertexAttribArray(position);
            this.gl.useProgram(p); 
        }) */
    } 
    public CreateBuffers(){
        // Create new buffer objects
        this.vertexBuffer = this.environment.gl.createBuffer();
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.environment.gl.bufferData(this.environment.gl.ARRAY_BUFFER, this.Geometri.Verticies, this.environment.gl.STATIC_DRAW);
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, null);
    } 
    public override draw(){ 
        this.updateTransform(); 
        this._bind();
        this._draw();
    } 
    public _bind(){
        this.environment.gl.bindBuffer              (this.environment.gl.ARRAY_BUFFER, this.vertexBuffer); 
        this.environment.gl.vertexAttribPointer     (this.Material.vertexPosition, 2, this.environment.gl.FLOAT, false, 0, 0); 
        this.environment.gl.enableVertexAttribArray (this.Material.vertexPosition);
        return;
    } 
    public _draw(){
        this.Material.use(); 
        this.environment.gl.drawArrays(this.environment.gl.TRIANGLES, 0, this.Geometri.Verticies.length / 2);
        return;
    } 


}