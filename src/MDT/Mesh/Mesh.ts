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
      
    public override draw(){  
        
        //console.log("Draw Mesh");
        this.transform.update();
        this.Material.use();
        
        // todo uniforms should be set in the material.
        // or environments
        this.gl.uniformMatrix4fv(this.Material.objectTransformMatrixUniformLocation, false , (this.transform.Matrix_transformation));
        this.primitives.forEach( p => {
            p.draw(this.Material);
        }); 
        
        this.gl.uniformMatrix4fv(
            this.Material.matrixProjection,
            false,
            this.environment.camera.projectionMatrix
        ); 

        this.gl.uniformMatrix4fv(
            this.Material.matrixCameraView,
            false,
            this.environment.camera.viewMatrix()
        ); 
    }  
}