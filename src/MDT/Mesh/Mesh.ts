import { Environment } from "../Environment";
import { Object } from "../Objects/Object";
import { MDTGeometri } from "./Geometri/MDTGeometri";
import { MaterialBase } from "./Materials/MaterialBase";


export class Mesh extends Object{
    
    private Geometri : MDTGeometri;
    private Material : MaterialBase; 
    private isDrawable(): boolean{return this.Geometri != null && this.Material != null};

    public constructor(environment:Environment,Geometri : MDTGeometri,Material : MaterialBase){
            super(environment);
            this.setGeometri(Geometri);
            this.setMaterial(Material);
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

        if(!this.isDrawable()){
            return;
        }
        
        this.gl.drawArrays(this.gl.TRIANGLES, 0 , 3 );
    }

    public setGeometri(Geometri : MDTGeometri){

        if(this.Geometri == undefined || this.Geometri == null){
            // todo dispose old Geometri
        } 
        this.Geometri = Geometri;
    }

    public setMaterial(Material : MaterialBase){
         
        if(this.Material == undefined || this.Material == null){
            // todo dispose old Material
        }
        this.Material = Material;
    }

}