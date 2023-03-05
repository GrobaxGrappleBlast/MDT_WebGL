import { MDTGeometri } from "../../../MDT/Mesh/Geometri/MDTGeometri";
import { IFileLoader } from "../../Loader";
import { GLTFFileLoaded, LoadedBuffer } from "./GTLFLoaded";
import { IGLTFFile } from "./GTLFRaw";
 


 
export class MDTGLTFLoader implements IFileLoader{
    
  supports(): string[] {
      return ["gltf"];
  }
  parse(file: string) {
    let loaded : GLTFFileLoaded = this.gltf_getVerticies(file);



  } 



  private gltf_getVerticies(gltf : GLTFFileLoaded){
    
    var name = gltf.meshes[0].name;
    var geometries : MDTGeometri[] = [];

    gltf.meshes[0].primitives.forEach( p => {
      var vertex_bufferView_position = p.attributes.POSITION;

      var Accessor   = gltf.accessors   [vertex_bufferView_position];
      var BufferView = gltf.bufferViews [Accessor.bufferView];

      var verticies = gltf.buffers[0].getDataFromBufferView(BufferView);
      geometries.push(new MDTGeometri(verticies,null,null));

    });
    return geometries; 
  }
  private parseFloat32(file: string) : GLTFFileLoaded{
    let raw = JSON.parse(file) as IGLTFFile;
        
    let encodingArray = raw.buffers[0].uri.split(':')[1].split(';'); // Extract encoding type
    let buffer        = raw.buffers[0].uri.split(/_(.*)/s)[1]; // splits at first ,
    let data          = this.decodeGLTFBuffer(buffer,encodingArray[1]);

    // --- --- --- --- --- --- --- --- --- --- --- ---
    // encodingArray = [application/octet-stream][base64]

    let newBuffers :LoadedBuffer[] = [];
    newBuffers.push( new LoadedBuffer(
      raw.buffers[0].byteLength,
      encodingArray[0],
      encodingArray[1],
      data
      )
    )
    return GLTFFileLoaded.createFromRaw(raw,newBuffers); 
  }
  private decodeGLTFBuffer(data: string, encoding: string): Float32Array {
      switch (encoding) {
        case 'base64':
          const decoded = atob(data); // decode the base64-encoded data into binary data
          const buffer = new ArrayBuffer(decoded.length); // create an ArrayBuffer to hold the binary data
          const view = new Uint8Array(buffer); // create a Uint8Array view into the ArrayBuffer
          for (let i = 0; i < decoded.length; i++) {
              view[i] = decoded.charCodeAt(i); // copy the binary data into the ArrayBuffer
          }
          return new Float32Array(buffer); // create a Float32Array view into the ArrayBuffer and return it
        case 'hex':
          // Parse hexadecimal encoding
          return this.hexStringToFloat32Array(data);
        default:
          throw new Error(`Unsupported buffer encoding type: ${encoding}`);
      }
  }
  private hexStringToFloat32Array(data: string): Float32Array {
      // Decode the hex string into a Uint8Array
      const bytes = new Uint8Array(data.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
      const floatArray = new Float32Array(bytes.buffer);
      return floatArray;
  }



}
    
 