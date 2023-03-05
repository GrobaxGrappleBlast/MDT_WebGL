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
  buffers     : Buffer    [];

  constructor( raw : IGLTF.IGLTFFile) {
      this.asset        = raw.asset       ; 
      this.scene        = raw.scene       ; 
      this.scenes       = raw.scenes      ; 
      this.nodes        = raw.nodes       ; 
      this.materials    = raw.materials   ; 

      console.log("GLTF LOADING ");
      // MESHES
      this.meshes       =  [];
      raw.meshes.forEach( m => {
        this.meshes.push(new Mesh(m,this));
      });
     
      // ACCESSORS
      this.accessors =  [];
      raw.accessors.forEach( a => {
        this.accessors.push(new Accessor(a, this));
      });
      
      // BUFFERVIEWS
      this.bufferViews = [];
      raw.bufferViews.forEach(view => {
         this.bufferViews.push(new BufferView(view,this));
      });
      
      // BUFFER 
      this.buffers = [];
      raw.buffers.forEach( b => {
        this.buffers.push( new Buffer(b,this) )
      }); 
       
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

  public getBufferView(){
    return this.parent.bufferViews[this.bufferView];
  }

  public getData(){
    const view = this.getBufferView();
    return view.getDataFromBuffer();
  }

} 
export class BufferView extends GLTFFileComponent {
  
  public buffer     : number;
  public byteLength : number;
  public byteOffset : number;
  public target     : number;

  public constructor( bufview : IGLTF.IBufferView, parent : GLTFFileLoaded){
    super(parent);
    this.buffer     = bufview.buffer     ; 
    this.byteLength = bufview.byteLength ; 
    this.byteOffset = bufview.byteOffset ; 
    this.target     = bufview.target     ; 
  }

  public getDataFromBuffer() : Float32Array{
    const numFloats   = this.byteLength / 4;
    const floatOffset = this.byteOffset / 4;
    const floatBuffer = new Float32Array(numFloats);
    floatBuffer.set(this.parent.buffers[this.buffer].data.subarray(floatOffset, floatOffset + numFloats));
    return floatBuffer;
  } 
} 
export class Buffer extends GLTFFileComponent {
  public byteLength: number;
  public encodingSpec  : string ;
  public encoding      : string ;
  public data : Float32Array;

  constructor( buff : IGLTF.IBuffer , parent : GLTFFileLoaded){
    super(parent);
    this.parseData(buff);
  };

  
  private parseData(buff : IGLTF.IBuffer){
    const data = buff.uri.split(':')[1]; // Extract encoding type
    const a  = data.indexOf(',');
    const encodingArray = data.substring(0, a).split(';');
    const buffer        = data.substring(a + 1);
    // --- --- --- --- --- --- --- --- --- --- --- --- ---
    // encodingArray = [application/octet-stream][base64]
    this.byteLength   = buff.byteLength;
    this.encodingSpec = encodingArray[0];
    this.encoding     = encodingArray[1];
    this.data = this.decodeGLTFBuffer(buffer,encodingArray[1]);
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
        const bytes = new Uint8Array(data.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
        const floatArray = new Float32Array(bytes.buffer);
        return floatArray;
      default:
        throw new Error(`Unsupported buffer encoding type: ${encoding}`);
    }
  }
} 
export class Mesh extends GLTFFileComponent {
  public name : string; 
  public primitives : Primitive[] = [];
  public constructor( mesh : IGLTF.IMesh, parent : GLTFFileLoaded){
    super(parent);
    this.name = mesh.name;  
    mesh.primitives.forEach( p => {
      this.primitives.push( new Primitive( p , parent ))
    });
  } 
} 
export class Primitive extends GLTFFileComponent{
  
  public attributes : { [ key : string ] : number } = {}; 
  public indices    : number;
  public material   : number;
  
  public constructor( primitive : IGLTF.IPrimitive , parent : GLTFFileLoaded){
    super(parent);
    this.setSinglePrimitive(primitive,AttributeName.POSITION    );
    this.setSinglePrimitive(primitive,AttributeName.NORMAL      );
    this.setSinglePrimitive(primitive,AttributeName.TANGENT     );
    this.setSinglePrimitive(primitive,AttributeName.COLOR_0     );
    this.setSinglePrimitive(primitive,AttributeName.COLOR_1     );
    this.setSinglePrimitive(primitive,AttributeName.JOINTS_0    );
    this.setSinglePrimitive(primitive,AttributeName.JOINTS_1    );
    this.setSinglePrimitive(primitive,AttributeName.WEIGHTS_0   );
    this.setSinglePrimitive(primitive,AttributeName.WEIGHTS_1   );
    this.setSinglePrimitive(primitive,AttributeName.TEXCOORD_0  );
    this.setSinglePrimitive(primitive,AttributeName.TEXCOORD_1  );
    this.setSinglePrimitive(primitive,AttributeName.TEXCOORD_2  );
    this.setSinglePrimitive(primitive,AttributeName.TEXCOORD_3  );
  } 

  private setSinglePrimitive( primitive : IGLTF.IPrimitive, attr : AttributeName ){
    var exist = ( primitive.attributes as any)[ attr ] != undefined;
    if(exist){
      this.attributes[attr] = ( primitive.attributes as any)[ attr ] as number;
    }
  }  

  public get Verticies() : Float32Array {
    const acces = this.parent.accessors[this.attributes[AttributeName.POSITION]];
    return acces.getData();
  }
  public get Normals() : Float32Array {
    const acces = this.parent.accessors[this.attributes[AttributeName.NORMAL  ]];
    return acces.getData();
  }
  public get Tangents() : Float32Array {
    const acces = this.parent.accessors[this.attributes[AttributeName.TANGENT ]];
    return acces.getData();
  }
  public get TextureCoordinates() : Float32Array {
    const acces = this.parent.accessors[this.attributes[AttributeName.TEXCOORD_0 ]];
    return acces.getData();
  }

}

export enum  AttributeName {
  POSITION   = 'POSITION'   ,  
  NORMAL     = 'NORMAL'     ,  
  TANGENT    = 'TANGENT'    ,  
  TEXCOORD_0 = 'TEXCOORD_0' ,  
  TEXCOORD_1 = 'TEXCOORD_1' ,  
  COLOR_0    = 'COLOR_0'    ,  
  JOINTS_0   = 'JOINTS_0'   ,  
  WEIGHTS_0  = 'WEIGHTS_0'  ,  
  JOINTS_1   = 'JOINTS_1'   ,  
  WEIGHTS_1  = 'WEIGHTS_1'  ,  
  COLOR_1    = 'COLOR_1'    ,  
  TEXCOORD_2 = 'TEXCOORD_2' ,  
  TEXCOORD_3 = 'TEXCOORD_3'
}

const attributeTypeMap: Record<string, AttributeName> = {
  POSITION   : AttributeName.POSITION   ,
  NORMAL     : AttributeName.NORMAL     ,
  TANGENT    : AttributeName.TANGENT    ,
  TEXCOORD_0 : AttributeName.TEXCOORD_0 ,
  TEXCOORD_1 : AttributeName.TEXCOORD_1 ,
  COLOR_0    : AttributeName.COLOR_0    ,
  JOINTS_0   : AttributeName.JOINTS_0   ,
  WEIGHTS_0  : AttributeName.WEIGHTS_0  ,
  JOINTS_1   : AttributeName.JOINTS_1   ,
  WEIGHTS_1  : AttributeName.WEIGHTS_1  ,
  COLOR_1    : AttributeName.COLOR_1    ,
  TEXCOORD_2 : AttributeName.TEXCOORD_2 ,
  TEXCOORD_3 : AttributeName.TEXCOORD_3 
};
 
 

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