import { Deserializer, JsonProperty, ObjectMapper, Serializer } from "json-object-mapper";
import { GlTfId } from "./GLTF";

export interface AccessorSparseIndices { // * An object pointing to a buffer view containing the indices of deviating accessor values. The number of indices is equal to `accessor.sparse.count`. Indices **MUST** strictly increase.
    bufferView : GlTfId; //   * The index of the buffer view with sparse indices. The referenced buffer view **MUST NOT** have its `target` or `byteStride` properties defined. The buffer view and the optional `byteOffset` **MUST** be aligned to the `componentType` byte length.
    byteOffset ?: number; //   * The offset relative to the start of the buffer view in bytes.
    componentType : number | number | number | number; //   * The indices data type.
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
}
export interface AccessorSparseValues { // * An object pointing to a buffer view containing the deviating accessor values. The number of elements is equal to `accessor.sparse.count` times number of components. The elements have the same component type as the base accessor. The elements are tightly packed. Data **MUST** be aligned following the same rules as the base accessor.
    bufferView : GlTfId; //   * The index of the bufferView with sparse values. The referenced buffer view **MUST NOT** have its `target` or `byteStride` properties defined.
    byteOffset ?: number; //   * The offset relative to the start of the bufferView in bytes.
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
}
export interface AccessorSparse { // * Sparse storage of accessor values that deviate from their initialization value.
    count : number; //   * Number of deviating accessor values stored in the sparse array.
    indices : AccessorSparseIndices; //   * An object pointing to a buffer view containing the indices of deviating accessor values. The number of indices is equal to `count`. Indices **MUST** strictly increase.
    values : AccessorSparseValues; //   * An object pointing to a buffer view containing the deviating accessor values.
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
}

export interface Accessor { // * A typed view into a buffer view that contains raw binary data.
    bufferView ?: GlTfId; //   * The index of the bufferView.
    byteOffset ?: number; //   * The offset relative to the start of the buffer view in bytes.
    componentType : number | number | number | number | number | number | number; //   * The datatype of the accessor's components.
    normalized ?: boolean; //   * Specifies whether integer data values are normalized before usage.
    count : number; //   * The number of elements referenced by this accessor.
    type : any | any | any | any | any | any | any | string; //   * Specifies if the accessor's elements are scalars, vectors, or matrices.
    max ?: number[]; //   * Maximum value of each component in this accessor.
    min ?: number[]; //   * Minimum value of each component in this accessor.
    sparse ?: AccessorSparse; //   * Sparse storage of elements that deviate from their initialization value.
    name ?: any;
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
}

export class Buffer implements Deserializer, Serializer{
  @JsonProperty({ type: ArrayBuffer , deserializer: Buffer.desirializeURI , serializer: Buffer.serializeURI })
  uri ?       : ArrayBuffer; //   * The URI (or IRI) of the buffer.
  byteLength  : number; //   * The length of the buffer in bytes.
  name ?      : any;
  extensions ?: any;
  extras ?    : any;
  [k: string] : any;

  serialize(value: any) {
    return ObjectMapper.serialize(this);
  }
  deserialize(value: any) {
    return ObjectMapper.deserialize(Buffer, value);
  }
  
  private static desirializeURI(value : string ) : ArrayBuffer {
    const data              = value.split(':')[1]; // Extract encoding type
    const a                 = data.indexOf(',');
    const encodingArray     = data.substring(0, a).split(';');
    const RAWStringBuffer   = data.substring(a + 1);
    // --- --- --- --- --- --- --- --- --- --- --- --- ---
    // encodingArray = [application/octet-stream][base64]
    // const encodingSpec = encodingArray[0];
    // const encoding     = encodingArray[1];
    //this.data = this.decodeGLTFBuffer(buffer,encodingArray[1]);
    const encoder = new TextEncoder();
    const _buffer = encoder.encode(RAWStringBuffer).buffer;
    return _buffer  ;
  }
  private static serializeURI(value:any):string{
    return "MY DESERIALIZED URI"
  }
  
}

export interface BufferView { // * A view into a buffer generally representing a subset of the buffer.
    buffer : GlTfId; //   * The index of the buffer.
    byteOffset ?: number; //   * The offset into the buffer in bytes.
    byteLength : number; //   * The length of the bufferView in bytes.
    byteStride ?: number; //   * The stride, in bytes.
    target ?: number | number | number; //   * The hint representing the intended GPU buffer type to use with this buffer view.
    name ?: any;
    extensions ?: any;
    extras ?: any;
    [k: string]: any; 
}

