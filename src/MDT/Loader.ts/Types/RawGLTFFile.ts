export interface  RawGLTFFile {
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

export interface  Buffer {
  byteLength: number;
  uri: string;
}

export interface  BufferView {
  buffer: number;
  byteLength: number;
  byteOffset: number;
  target: number;
}

export interface  Accessor {
  bufferView: number;
  componentType: number;
  count: number;
  max?: number[];
  min?: number[];
  type: string;
}

export interface  Mesh {
  name: string;
  primitives: Primitive[];
}

export interface  Primitive {
  attributes: Attributes;
  indices: number;
  material: number;
}

export interface  Attributes {
  POSITION: number;
  NORMAL: number;
  TEXCOORD_0: number;
}

 export interface  Material {
  doubleSided: boolean;
  name: string;
  pbrMetallicRoughness: PbrMetallicRoughness;
}

 export interface  PbrMetallicRoughness {
  baseColorFactor: number[];
  metallicFactor: number;
  roughnessFactor: number;
}

 export interface  Node {
  mesh: number;
  name: string;
}

 export interface  Scene {
  name: string;
  nodes: number[];
}

export interface  Asset {
  generator: string;
  version: string;
}