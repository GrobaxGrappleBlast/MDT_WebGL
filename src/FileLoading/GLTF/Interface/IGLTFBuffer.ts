import { Accessor } from "./IGLTFAccessor";
import { Mesh } from "./IGLTFMesh";
import { Asset, Camera, Material , Image, Sampler, GlTfId, Scene, Skin, Texture} from "./IGLTFOther";
 

// A buffer points to binary geometry, animation, or skins.
export interface Buffer {
  // The URI (or IRI) of the buffer.
  uri ?: string;
  // The length of the buffer in bytes.
  byteLength : number;
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
// A view into a buffer generally representing a subset of the buffer.
export interface BufferView {
    // The index of the buffer.
    buffer : GlTfId;
    // The offset into the buffer in bytes.
    byteOffset ?: number;
    // The length of the bufferView in bytes.
    byteLength : number;
    // The stride, in bytes.
    byteStride ?: number;
    // The hint representing the intended GPU buffer type to use with this buffer view.
    target ?: number | number | number;
    name ?: any;
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
  }