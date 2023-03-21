import { RawGeometri } from "../../../MDT/Mesh/Geometri/RawGeometri";
import { GlTf, GlTfId } from "./GLTF";

interface AccessorSizes {
  [key: string]: number;
}  
const accessorSizes : AccessorSizes =  {
  SCALAR :  1,
  VEC2   :  2,
  VEC3   :  3,
  VEC4   :  4,
  MAT2   :  4,
  MAT3   :  9,
  MAT4   :  16
};


export class MeshPrimitive { // * Geometry to be rendered with the given material.
  //   * A plain JSON object, where each key corresponds to a mesh attribute semantic and each value is the index of the accessor containing attribute's data.  
  attributes : { [k: string]: GlTfId;};
  indices   ?: GlTfId; //   * The index of the accessor that contains the vertex indices.
  material  ?: GlTfId; //   * The index of the material to apply to this primitive when rendering.
  mode      ?: number | number | number | number | number | number | number | number; //   * The topology type of primitives to render.
  targets   ?: { [k: string]: GlTfId; }[];
  extensions?: any;
  extras    ?: any;
  [k: string]: any;
}
export class Mesh { // * A set of primitives to be rendered.  Its global transform is defined by a node that references it.
    
    primitives : MeshPrimitive[]; //   * An array of primitives, each defining geometry to be rendered.
    weights   ?: number[]; //   * Array of weights to be applied to the morph targets. The number of array elements **MUST** match the number of morph targets.
    name      ?: any;
    extensions?: any;
    extras    ?: any;
    [k: string]: any;

    public asRawGeometri( v : GlTf ){ 
  
      function getFloatBufferByName(p : MeshPrimitive,name:string) : Float32Array {
        if( p.attributes[name] == undefined )
          return null;
        
        const accessor  = v.accessors   [p.attributes[name]];
        const view      = v.bufferViews [accessor.bufferView];
        const size      = accessorSizes[accessor.type] as number;
        const data      = new Float32Array(
          v.buffers[view.buffer].uri,
          (accessor.byteOffset || 0) + (view.byteOffset || 0),
          accessor.count * size
          );
            //: new Int16Array    (buffers[bufferView.buffer], (accessor.byteOffset || 0) + (bufferView.byteOffset || 0), accessor.count * size);
          return data;
      }

      function getUintBufferByName (p : MeshPrimitive,name:string) : Uint16Array {
        if(p[name] == undefined)
          return null;

        const accessor  = v.accessors   [p.attributes[name]];
        const view      = v.bufferViews [accessor.bufferView];
        const size      = accessorSizes[accessor.type] as number;
        const data      = new Uint16Array(
          v.buffers[view.buffer].uri,
          (accessor.byteOffset || 0) + (view.byteOffset || 0),
          accessor.count * size
          );
        return data;
      }

      this.primitives.forEach( p => { 
        let raw = new RawGeometri();
        raw.indices    = new Uint16Array(getUintBufferByName (p,"indicies"));
        raw.POSITION   = getFloatBufferByName(p,"POSITION");
        raw.TEXCOORD_0 = getFloatBufferByName(p,"TEXCOORD_0");
        raw.NORMAL     = getFloatBufferByName(p,"NORMAL"); 
      }); 
    }
}


