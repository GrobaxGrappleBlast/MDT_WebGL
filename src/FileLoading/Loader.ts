
import { MDTMeshPrimitive } from "../MDT/Mesh/Geometri/MDTMeshPrimitive";
import { RawGeometri } from "../MDT/Mesh/Geometri/RawGeometri";
import { GLTFLoader } from "./GLTF/GLTFLoader";  

 
export interface IFileLoader{
    supports() : string[];
    parse(file:string): any;
}


 


export class Loader{
 
    public async loadModel(url: string) : Promise<RawGeometri[]> {
 
        const loader = new GLTFLoader();
        const meshes = await loader.loadModel(url); 

        let geometries : RawGeometri[]=[];
        
        meshes.forEach( m  => { 

            var a : RawGeometri = {
                POSITION    : m.positions.data,
                NORMAL      : m.normals.data,
                TEXCOORD_0  : m.texCoord.data,
                indices : null
            }
            geometries.push(a);
        }); 
 
        return geometries;
    } 
 
    private static async LoadFile(url: string): Promise<string> {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    }
    
    private static async LoadLocalFile(url: string): Promise<string> {
        return this.LoadFile(url)
    }
}