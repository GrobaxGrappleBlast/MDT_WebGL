import { Accessor } from "./IGLTFAccessor";
import { BufferView } from "./IGLTFBuffer"; 
import { Asset, Camera, Material , Image, Sampler, GlTfId, Scene, Skin, Texture} from "./IGLTFOther";

 
// Geometry to be rendered with the given material.
export interface MeshPrimitive {
    // A plain JSON object, where each key corresponds to a mesh attribute semantic and each value is the index of the accessor containing attribute's data.
    attributes : {
      [k: string]: GlTfId;
    };
    // The index of the accessor that contains the vertex indices.
    indices ?: GlTfId;
    // The index of the material to apply to this primitive when rendering.
    material ?: GlTfId;
    // The topology type of primitives to render.
    mode ?: number | number | number | number | number | number | number | number;
    // An array of morph targets.
    targets ?: {
      [k: string]: GlTfId;
    }[];
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
  }
  // A set of primitives to be rendered.  Its global transform is defined by a node that references it.
  export interface Mesh {
    // An array of primitives, each defining geometry to be rendered.
    primitives : MeshPrimitive[];
    // match the number of morph targets.
    weights ?: number[];
    name ?: any;
    extensions ?: any;
    extras ?: any;
    [k: string]: any;
  }