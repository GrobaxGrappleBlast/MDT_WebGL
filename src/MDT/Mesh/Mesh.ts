import { mat4 } from "gl-matrix";
import { MDTFileMeshPrimitive } from "../../FileLoading/LoadedFile/MDTFile";
import { Environment, IEnvironment } from "../Environment";
import { MDTObject } from "../Objects/Object"; 
import { MDTMeshPrimitive } from "./Geometri/MDTMeshPrimitive"; 
import { StandardMaterial } from "./Materials/StandardMaterial";


export class Mesh extends MDTObject{
    
    private primitives   : MDTMeshPrimitive[] = [];
    public  Material     : StandardMaterial;  

    public constructor(environment:IEnvironment, Geometries : MDTFileMeshPrimitive[] ,Material : StandardMaterial){
        super(environment);
        this.Material = Material;
        Geometries.forEach( p => {
            this.primitives.push(new MDTMeshPrimitive(p,environment));
        });
    } 
    
    private finalMatrix:mat4;
    private matrix : mat4;
    public hasrun = false;
    private calcMatrix(){
        
        this.matrix = mat4.create();
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, 
            75 * Math.PI/180, // vertical field-of-view (angle, radians)
            0.5, // aspect W/H
            1e-4, // near cull distance
            1e4 // far cull distance
        );
        
        this.finalMatrix = mat4.create();
        mat4.translate  ( this.matrix     , this.matrix     , [.2, .5, -2]   );
        mat4.multiply   ( this.finalMatrix, projectionMatrix, this.matrix         );
        
        return this.finalMatrix;
    }


    public override draw(){ 
        //console.log("DRAW");
        this.transform.update();
        this.Material.use();
        
        this.gl.uniformMatrix4fv(this.Material.objectTransformMatrixUniformLocation, false , (this.transform.Matrix_transformation));
        this.primitives.forEach( p => {
            p.draw(this.Material);
        }); 
        
        this.gl.uniformMatrix4fv(
            this.Material.cameraMatrixUniformLocation,
            false,
            this.environment.camera.cameraMatrix
        );
        ///console.log("DRAW DONE");
    }  
}