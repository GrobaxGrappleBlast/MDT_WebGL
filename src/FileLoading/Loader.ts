
import { MDTMeshPrimitive } from "../MDT/Mesh/Geometri/MDTMeshPrimitive"; 
import { MDTFile } from "./LoadedFile/MDTFile";

 
 
interface createFileCommand{
    ( json : string) : MDTFile;
}

class FileLoader{
    public fileExtensions : string[] = [];
    public command : createFileCommand;
    public  constructor( extensions: string[], command: createFileCommand){
        this.fileExtensions = extensions;
        this.command = command;
    }
}
export class Loader{
 
    private fileLoaders : FileLoader[] = []; //: [ key : string ] ( (json : string ) => MDTFile );

    public constructor(){
        this.fileLoaders.push(
            new FileLoader(["gltf"], ( json )=>MDTFile.DeserializeGTLF(json) )
        );

    }


    public async loadModel(url: string) : Promise<MDTFile> {
        
        let arr = url.split(".");
        const affix = arr[arr.length-1];

        var _loader :FileLoader = null;
        this.fileLoaders.forEach(loader => {
            if( loader.fileExtensions.includes(affix) ){
                _loader = loader;
            }
        });

        if(_loader == null){
            console.error("Could not Load file with extension of " + affix);
        }

        const file = await Loader.LoadFile(url);
        var Model = _loader.command(file);
        
        return Model;
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