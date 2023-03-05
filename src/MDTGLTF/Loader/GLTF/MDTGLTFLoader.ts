
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

  private async parseGLTFFile( file : string): Promise<GLTFFileLoaded>{
    let rawParsed = JSON.parse(file) as IGLTFFile;
    let GLTF = new GLTFFileLoaded(rawParsed);
    return GLTF;
  }
}
    
 