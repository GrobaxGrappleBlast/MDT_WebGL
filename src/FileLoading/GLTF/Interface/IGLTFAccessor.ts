import { BufferView } from "./IGLTFBuffer";
import { Mesh } from "./IGLTFMesh";
import { Asset, Camera, Material , Image, Sampler, GlTfId, Scene, Skin, Texture} from "./IGLTFOther";

 

export interface AccessorSparseIndices {
    // be aligned to the `componentType` byte length.
    bufferView : GlTfId;
    // The offset relative to the start of the buffer view in bytes.
    byteOffset ?: number;
    // The indices data type.
    componentType : number | number | number | number;
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
  }
  // be aligned following the same rules as the base accessor.
  export interface AccessorSparseValues {
    // have its `target` or `byteStride` properties defined.
    bufferView : GlTfId;
    // The offset relative to the start of the bufferView in bytes.
    byteOffset ?: number;
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
  }
  // Sparse storage of accessor values that deviate from their initialization value.
  export interface AccessorSparse {
    // Number of deviating accessor values stored in the sparse array.
    count : number;
    // strictly increase.
    indices : AccessorSparseIndices;
    // An object pointing to a buffer view containing the deviating accessor values.
    values : AccessorSparseValues;
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
  }


export enum AccessorComponentType {
  BYTE          = 5120 ,
  UNSIGNED_BYTE = 5121 ,
  SHORT         = 5122 ,
  UNSIGNED_SHORT= 5123 ,
  UNSIGNED_INT  = 5125 ,
  FLOAT         = 5126 
}
// A typed view into a buffer view that contains raw binary data.
export interface Accessor {
    // The index of the bufferView.
    bufferView ?: GlTfId;
    // The offset relative to the start of the buffer view in bytes.
    byteOffset ?: number;
    // The datatype of the accessor's components.
    componentType : AccessorComponentType;
    // Specifies whether integer data values are normalized before usage.
    normalized ?: boolean;
    // The number of elements referenced by this accessor.
    count : number;
    // Specifies if the accessor's elements are scalars, vectors, or matrices.
    type : any | any | any | any | any | any | any | string;
    // Maximum value of each component in this accessor.
    max ?: number[];
    // Minimum value of each component in this accessor.
    min ?: number[];
    // Sparse storage of elements that deviate from their initialization value.
    sparse ?: AccessorSparse;
    name ?: any;
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
  }