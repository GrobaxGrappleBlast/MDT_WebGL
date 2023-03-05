import * as IGLTF from "./GTLFRaw";


abstract class GLTFFileComponent{

  protected parent : GLTFFileLoaded = null;
  public constructor(parent : GLTFFileLoaded){
    this.parent = parent;
  }
}

export class GLTFFileLoaded {
  asset       : Asset       ;
  scene       : number      ; 
  scenes      : Scene     [];
  nodes       : Node      [];
  materials   : Material  [];
  meshes      : Mesh      [];
  accessors   : Accessor  [];
  bufferViews : BufferView[];
  buffers     : LoadedBuffer    [];

  public static createFromRaw(raw:IGLTF.IGLTFFile, buffers: LoadedBuffer[]) : GLTFFileLoaded{
    return new GLTFFileLoaded(
      raw.asset       ,
      raw.scene       ,
      raw.scenes      ,
      raw.nodes       ,
      raw.materials   ,  
      raw.meshes      ,
      raw.accessors   ,  
      raw.bufferViews ,    
      buffers
      );
  }
  constructor(asset: IGLTF.IAsset,scene: number,scenes: IGLTF.IScene[],nodes: IGLTF.INode[],materials: IGLTF.IMaterial[],meshes: IGLTF.IMesh[],accessors: Accessor[],bufferViews: IGLTF.IBufferView[],buffers: LoadedBuffer[]) {
      this.asset        = asset       ; 
      this.scene        = scene       ; 
      this.scenes       = scenes      ; 
      this.nodes        = nodes       ; 
      this.materials    = materials   ; 
      this.meshes       = meshes      ; 

      this.accessors;
      accessors.forEach( a => {
        this.accessors.push(new Accessor(a, this));
      });
      
      this.bufferViews  = bufferViews ; 
      this.buffers      = buffers     ;
      
  }

}

export class Accessor extends GLTFFileComponent {
  
  public bufferView   : number;
  public componentType: number;
  public count        : number;
  public max?         : number[];
  public min?         : number[];
  public type         : string;
  public normalized?  : boolean;

  public constructor(accesor : IGLTF.IAccessor, parent :GLTFFileLoaded){
    super(parent);
    this.bufferView    = accesor.bufferView   ;
    this.componentType = accesor.componentType;
    this.count         = accesor.count        ;
    this.max           = accesor.max          ;
    this.min           = accesor.min          ;
    this.type          = accesor.type         ;
    this.normalized    = accesor.normalized   ;
  }
}

export class LoadedBuffer extends GLTFFileComponent {
  public byteLength: number;
  public encodingSpec  : string ;
  public encoding      : string ;
  public data : Float32Array;

  constructor( byteLength: number, encodingSpec  : string , encoding: string , data : Float32Array, parent : GLTFFileLoaded){
    super(parent);
    this.byteLength   = byteLength   ;
    this.encodingSpec = encodingSpec ;
    this.encoding     = encoding     ;
    this.data         = data         ;
  };

  public getDataFromBufferView( bufferView : BufferView) : Float32Array{
    const numFloats = bufferView.byteLength / 4;
    const floatOffset = bufferView.byteOffset / 4;
    const floatBuffer = new Float32Array(numFloats);
    floatBuffer.set(this.data.subarray(floatOffset, floatOffset + numFloats));
    return floatBuffer;
  }
}

interface BufferView {
  buffer: number;
  byteLength: number;
  byteOffset: number;
  target: number;
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
  COLOR_0: number;
}

interface Material {
  alphaMode: string;
  doubleSided: boolean;
  name: string;
  pbrMetallicRoughness: PbrMetallicRoughness;
}

interface PbrMetallicRoughness {
}

interface Node {
  mesh?: number;
  name: string;
  rotation?: number[];
  scale?: number[];
  translation?: number[];
  children?: number[];
}

interface Scene {
  name: string;
  nodes: number[];
}

interface Asset {
  generator: string;
  version: string;
}