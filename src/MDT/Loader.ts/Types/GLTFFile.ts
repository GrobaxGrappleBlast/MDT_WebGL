import * as raw from "./RawGLTFFile";


export class GTLFFile implements IGLTFFile{
    
    public constructor( rawData : raw.RawGLTFFile){
        this.asset       = rawData.asset;
        this.scene       = rawData.scene;
        this.scenes      = rawData.scenes;
        this.nodes       = rawData.nodes;
        this.materials   = rawData.materials;
        this.meshes      = rawData.meshes;
        this.accessors   = rawData.accessors;
        this.bufferViews = rawData.bufferViews; 
        this.createBuffers(rawData.buffers);
    }


    private createBuffers(buffers : raw.Buffer[] ){
        if(buffers == undefined || buffers == null )
            console.error(`Loaded Model had null Data`);

        buffers.forEach(buffer => {

            if(buffer.uri == undefined || buffer.uri == null || buffer.uri == "")
                console.error(`one or more data buffers had Null data on Loaded Model`);

            var s = -1;

            for (let i = 0; i < buffer.uri.length; i++) {
               if(buffer.uri[i] == ","){
                    s = i;
                    break;
                }
            } 

            if(s == -1){
                console.error("did not find , symbol");
                return;
            }


            var Buff = buffer.uri.slice(s +1 );
            var settings = buffer.uri.slice(0,s  );

            //var Array = new Float32Array(Buff);

            console.log("Stop HEr");

        });
    }


    
    asset: Asset;
    scene: number;
    scenes: Scene[];
    nodes: Node[];
    materials: Material[];
    meshes: Mesh[];
    accessors: Accessor[];
    bufferViews: BufferView[];
    buffers: Buffer[];

}

interface IGLTFFile {
    asset: Asset;
    scene: number;
    scenes: Scene[];
    nodes: Node[];
    materials: Material[];
    meshes: Mesh[];
    accessors: Accessor[];
    bufferViews: BufferView[];
    buffers: Buffer[];
  }
  
  interface Buffer {
    byteLength: number;
    data: Float32Array;
    uri: string;
  }
  
  interface BufferView {
    buffer: number;
    byteLength: number;
    byteOffset: number;
    target: number;
  }
  
  interface Accessor {
    bufferView: number;
    componentType: number;
    count: number;
    max?: number[];
    min?: number[];
    type: string;
  }
  
  interface Mesh {
    name: string;
    primitives: Primitive[];
  }
  
  interface Primitive {
    attributes: Attributes;
    indices: number;
    material: number;
  }
  
  interface Attributes {
    POSITION: number;
    NORMAL: number;
    TEXCOORD_0: number;
  }
  
   interface Material {
    doubleSided: boolean;
    name: string;
    pbrMetallicRoughness: PbrMetallicRoughness;
  }
  
   interface PbrMetallicRoughness {
    baseColorFactor: number[];
    metallicFactor: number;
    roughnessFactor: number;
  }
  
   interface Node {
    mesh: number;
    name: string;
  }
  
   interface Scene {
    name: string;
    nodes: number[];
  }
  
  interface Asset {
    generator: string;
    version: string;
  }