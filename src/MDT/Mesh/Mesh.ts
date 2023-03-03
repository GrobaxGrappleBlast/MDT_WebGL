import { gl } from "../Core";
import { MDTGeometri } from "./Geometri/MDTGeometri";
import { MaterialBase } from "./Materials/MaterialBase";


export class Mesh{

    private Geometri : MDTGeometri;
    private Material : MaterialBase;
    private isDrawable(): boolean{return this.Geometri != null && this.Material != null};

    public constructor(Geometri? : MDTGeometri,Material? : MaterialBase){
        
        if(Geometri != undefined || Geometri != null){
            this.setGeometri(Geometri);
        }

        if(Material != undefined || Material != null){
            this.setMaterial(Material);
        } 

        console.log("STOP HER");
        this.initialize();
    }

    public initialize(){

        if(!this.isDrawable()){
            return;
        }
 
        console.log("INITIALIZED STARTED");

        var triangle = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangle);
        gl.bufferData(gl.ARRAY_BUFFER, this.Geometri.Verticies ,gl.STATIC_DRAW);

        this.Material.toShaderProgram( (p) => { 
            var position = gl.getAttribLocation (p,'vertPosition');
            //var color = gl.getAttribLocation    (p,'vertColor');
            gl.vertexAttribPointer( 
                position,
                2,
                gl.FLOAT,
                false,
                2 * Float32Array.BYTES_PER_ELEMENT,
                0
            );
            gl.enableVertexAttribArray(position);
            gl.useProgram(p); 
        })
        
       
    }

    public draw(){

        if(!this.isDrawable()){
            return;
        }
        
        gl.drawArrays(gl.TRIANGLES, 0 , 3 );
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