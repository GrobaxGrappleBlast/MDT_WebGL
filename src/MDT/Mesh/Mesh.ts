import { Environment } from "../Environment";
import { MDTObject } from "../Objects/Object";
import { MDTGeometri } from "./Geometri/MDTGeometri"; 
import { StandardMaterial } from "./Materials/StandardMaterial";


export class Mesh extends MDTObject{
    
    private Geometri : MDTGeometri;
    private Material : StandardMaterial; 
    
    private vertexBuffer: WebGLBuffer = null;

    public constructor(environment:Environment,Geometri : MDTGeometri,Material : StandardMaterial){
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
        console.log("DRAW");
        this.updateTransform();

        if(this.Material == null)
            return;

        this.Material.use();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(this.Material.vertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(0);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    }

    public setGeometri(Geometri : MDTGeometri){

        if(this.Geometri == undefined || this.Geometri == null){
            // todo dispose old Geometri
        } 
        this.Geometri = Geometri;
        
        // create the buffer
        this.vertexBuffer = this.gl.createBuffer();
        // bind the Buffer 
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.Geometri.Verticies), this.gl.STATIC_DRAW);
    }

    public setMaterial(Material : StandardMaterial){ 
        if(this.Material == undefined || this.Material == null){
            // todo dispose old Material
        }
        this.Material = Material;
    }

}