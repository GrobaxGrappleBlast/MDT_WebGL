import { Environment, IEnvironment } from "../Environment";
import { MDTObject } from "../Objects/Object";
import { MDTGeometri } from "./Geometri/MDTGeometri"; 
import { StandardMaterial } from "./Materials/StandardMaterial";


export class Mesh extends MDTObject{
    
    private Geometri : MDTGeometri;
    private Material : StandardMaterial; 
    
    private vertexBuffer: WebGLBuffer = null;

    public constructor(environment:IEnvironment,Geometri : MDTGeometri,Material : StandardMaterial){
            super(environment);
            this.setMaterial(Material);
            this.setGeometri(Geometri);            
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
    public override draw(){
        
        this.updateTransform();

        if(this.Material == null)
            return;

        this.Material.use();
        this._bind();
        this._draw();
    }

    protected _bind(){
        this.environment.gl.bindBuffer              (this.environment.gl.ARRAY_BUFFER, this.vertexBuffer); 
        this.environment.gl.vertexAttribPointer     (this.Material.vertexPosition, 2, this.environment.gl.FLOAT, false, 0, 0); 
        this.environment.gl.enableVertexAttribArray (this.Material.vertexPosition);
    } 
    protected _draw(){
        this.gl.clearColor   (0.5, 0.5, 0.5, 0.9);
        this.gl.enable       (this.gl.DEPTH_TEST); 
        this.gl.clear        (this.gl.COLOR_BUFFER_BIT);
        this.gl.viewport     (0,0,600,600);
        this.environment.gl.drawArrays(this.environment.gl.TRIANGLES, 0, 3);
    }



    public setGeometri(Geometri : MDTGeometri){
 
        // Create new buffer objects
        this.vertexBuffer = this.environment.gl.createBuffer();
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.environment.gl.bufferData(this.environment.gl.ARRAY_BUFFER, Geometri.Verticies, this.environment.gl.STATIC_DRAW);
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, null);

    }

    public setMaterial(Material : StandardMaterial){ 
        if(this.Material == undefined || this.Material == null){
            // todo dispose old Material
        }
        this.Material = Material;
    }

}