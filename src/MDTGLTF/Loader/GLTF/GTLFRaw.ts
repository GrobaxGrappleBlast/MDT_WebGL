
 export interface IGLTFFile {
  asset       : IAsset;
  scene       : number;
  scenes      : IScene[];
  nodes       : INode[];
  materials   : IMaterial[];
  meshes      : IMesh[];
  accessors   : IAccessor[];
  bufferViews : IBufferView[];
  buffers     : IBuffer[];
}

export interface IBuffer {
  byteLength: number;
  uri: string;
}

export interface IBufferView {
  buffer: number;
  byteLength: number;
  byteOffset: number;
  target: number;
}

export interface IAccessor {
  bufferView: number;
  componentType: number;
  count: number;
  max?: number[];
  min?: number[];
  type: string;
  normalized?: boolean;
}

export interface IMesh {
  name: string;
  primitives: IPrimitive[];
}

export interface IPrimitive {
  attributes: IAttributes;
  indices: number;
  material: number;
}

export interface IAttributes {
    POSITION    : number;  
    NORMAL      : number;
    TANGENT     : number;
    TEXCOORD_0  : number;    
    TEXCOORD_1  : number;    
    COLOR_0     : number;
    JOINTS_0    : number;  
    WEIGHTS_0   : number;  
    JOINTS_1    : number;  
    WEIGHTS_1   : number;  
    COLOR_1     : number;
    TEXCOORD_2  : number;    
    TEXCOORD_3  : number;
}

export interface IMaterial {
  alphaMode: string;
  doubleSided: boolean;
  name: string;
  pbrMetallicRoughness: PbrMetallicRoughness;
}

export interface PbrMetallicRoughness {
}

export interface INode {
  mesh?: number;
  name: string;
  rotation?: number[];
  scale?: number[];
  translation?: number[];
  children?: number[];
}

export interface IScene {
  name: string;
  nodes: number[];
}

export interface IAsset {
  generator: string;
  version: string;
}