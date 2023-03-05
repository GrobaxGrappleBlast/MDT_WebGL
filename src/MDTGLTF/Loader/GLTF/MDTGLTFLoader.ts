import { MDTGeometri } from "../../../MDT/Mesh/Geometri/MDTGeometri";
import { IFileLoader, Loader } from "../../Loader";
import { GLTFFileLoaded, Buffer } from "./GTLFLoaded";
import { IGLTFFile } from "./GTLFRaw";
 


 
export class MDTGLTFLoader implements IFileLoader{
    
  public supports(): string[] {
      return ["gltf"];
  }
  public async parse(file: string) : Promise<GLTFFileLoaded>{
    var loaded : GLTFFileLoaded = await this.parseGLTFFile(file);
    return loaded;
  }  

  private async parseGLTFFile( url : string): Promise<GLTFFileLoaded>{
    let raw       = await Loader.LoadFile(url);
    let rawParsed = JSON.parse(raw) as IGLTFFile;
    let GLTF = new GLTFFileLoaded(rawParsed);
    return GLTF;
  }





}
    
 