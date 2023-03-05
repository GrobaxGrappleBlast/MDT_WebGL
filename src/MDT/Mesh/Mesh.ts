import { mat4 } from "gl-matrix";
import { Environment, IEnvironment } from "../Environment";
import { MDTObject } from "../Objects/Object"; 
import { MDTMeshPrimitive } from "./Geometri/MDTMeshPrimitive";
import { RawGeometri } from "./Geometri/RawGeometri";
import { StandardMaterial } from "./Materials/StandardMaterial";


export class Mesh extends MDTObject{
    
    private primitives   : MDTMeshPrimitive[] = [];
    public  Material     : StandardMaterial;  

    public constructor(environment:IEnvironment, Geometries : RawGeometri[] ,Material : StandardMaterial){
        super(environment);
        this.Material = Material;
        Geometries.forEach( p => {
            this.primitives.push(new MDTMeshPrimitive(p,environment));
        });
    } 
    
    public override draw(){ 
        
        this.Material.use();
        this.transform.update();
        
        this.gl.uniformMatrix4fv(this.Material.objectTransformMatrixUniformLocation, false , (this.transform.Matrix_transformation));
        this.primitives.forEach( p => {
            p.draw(this.Material);
        });

        this.transform.rotation[2] += 0.02;
        this.transform.rotation[0] += 0.06;
    }  
}