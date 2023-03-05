import { MDTGeometri } from "../MDT/Mesh/Geometri/MDTGeometri";
import { GLTFFileLoaded } from "./Loader/GLTF/GTLFLoaded";
import { MDTGLTFLoader } from "./Loader/GLTF/MDTGLTFLoader";

export interface IFileLoader{
    supports() : string[];
    parse(file:string): any;
}

export class Loader{

    private loaders : IFileLoader[] = [];
    public constructor(){
        this.loaders.push(new MDTGLTFLoader());
    }

    public async loadModel(url: string) : Promise<any> {
 
        const arr = url.split('.');
        const extention = arr[arr.length -1];

        function getLoader( loaders :IFileLoader[] ) : IFileLoader{
            let loader: IFileLoader;
            let supports : string[];
            for (let i = 0; i < loaders.length; i++) {
                supports = loaders[i].supports();
                for (let j = 0; j < supports.length; j++) {
                    if(supports[j] == 'extention'){
                        return loaders[i];
                    }
                }
            }
            return null;
        }

        const loader = getLoader( this.loaders );
        if(loader == null){
            throw console.error(" No Loader was found for file of extension ." + extention);
        }

        const data  = await Loader.LoadFile(url);
        const model = await loader.parse(data)  as GLTFFileLoaded; 

        let geometries : MDTGeometri[]=[];
        model.meshes.forEach( m  => {
            m.primitives.forEach( p => {
                geometries.push(new MDTGeometri( p.Verticies, p.Normals, p.TextureCoordinates ));
            });
        });

        return 1;
    } 







    public static async LoadFile(url: string): Promise<string> {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    }
    
    public static async LoadLocalFile(url: string): Promise<string> {
        return this.LoadFile(url)
    }

}