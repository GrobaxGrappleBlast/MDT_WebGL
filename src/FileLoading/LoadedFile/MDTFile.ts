import { MDTBuffer, MDTBufferMaker } from "./MDTBuffer";
import * as IGLTF from '../GLTF/Interface/IGLTFCombined';
import { JsonProperty, JsonDeserialize, JsonSerialize } from 'jackson-js';



export class MDTFile{ 

    public meshes : MDTFileMesh[] = [] ;

    public static DeserializeGTLF( file : string ): MDTFile{
        var gltf = JSON.parse(file) as IGLTF.GlTf;
        let MDT = new MDTFile();
        const Buffers : ArrayBufferLike[] = []; 
        gltf.buffers.forEach( buffer => {
            Buffers.push(MDTFile.desirialize_GLTF_URI(buffer.uri))
        })

        gltf.meshes.forEach( mesh => {
            MDT.meshes.push( MDTFileMesh.DeserializeObject(gltf,Buffers, mesh) );
        })
        return MDT;
    }
 
    public static desirialize_GLTF_URI(value : string ) : ArrayBuffer {
        const data              = value.split(':')[1]; // Extract encoding type
        const a                 = data.indexOf(',');
        //const encodingArray     = data.substring(0, a).split(';');
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
}

export class MDTFileMesh{

    public name : string; 
    public primitives :MDTFileMeshPrimitive[] = [];
    // public weights   ?: number[];
 
    public static DeserializeObject( parent:IGLTF.GlTf ,Buffers: ArrayBufferLike[], mesh : IGLTF.Mesh ) : MDTFileMesh {
        const _mesh = new MDTFileMesh() ;
        mesh.primitives.forEach( prim => {
            _mesh.primitives.push( MDTFileMeshPrimitive.DeserializeObject(parent,Buffers, prim) );
        });
        return _mesh;
    }

}

export class MDTFileMeshPrimitive{
    // public material :Material
    public buffers : MDTFileMeshPrimitiveAttribute = new MDTFileMeshPrimitiveAttribute();
    // public weights   ?: number[];
    public accessorSize : number; 

    public name :string;

    public static DeserializeObject( parent:IGLTF.GlTf ,Buffers: ArrayBufferLike[], primitive : IGLTF.MeshPrimitive ) : MDTFileMeshPrimitive {
        
        const prim = new MDTFileMeshPrimitive();
        for( const attr in primitive.attributes){
            const input = attr.split("_");
            const key   = input[0];
            const accessor  = parent.accessors  [ primitive.attributes[attr] ];
            const bufferView= parent.bufferViews[ accessor.bufferView ];
            switch(key){
            case "POSITION" :
                prim.buffers.POSITION =  MDTBufferMaker.createGLTFBuffer( accessor.componentType,Buffers[bufferView.buffer], accessor, bufferView);
                break;
            case "NORMAL"   :
                prim.buffers.NORMAL   =  MDTBufferMaker.createGLTFBuffer( accessor.componentType,Buffers[bufferView.buffer], accessor, bufferView);
                break;
            case "TEXCOORD" :break;
            case "COLOR"    :break;
            case "TANGENT"  :
                prim.buffers.TANGENT  =  MDTBufferMaker.createGLTFBuffer( accessor.componentType,Buffers[bufferView.buffer], accessor, bufferView);
                break;
            case "WEIGHTS"  :break;
            case "JOINTS"   :break;
            case "MORPH"    :break;
            }
         }
         const accessor  = parent.accessors  [ primitive.indices];
         const bufferView= parent.bufferViews[ accessor.bufferView ]; 
         prim.buffers.INDICIES = MDTBufferMaker.createGLTFBuffer( accessor.componentType, Buffers[bufferView.buffer], accessor, bufferView);
         return prim;
    }
}

export class MDTFileMeshPrimitiveAttribute{
    public POSITION      : MDTBuffer<ArrayBuffer> ;
    public NORMAL        : MDTBuffer<ArrayBuffer> ; 
    public TEXCOORD_0    : MDTBuffer<ArrayBuffer> ;
    public TEXCOORD_1    : MDTBuffer<ArrayBuffer> ;
    public COLOR_0       : MDTBuffer<ArrayBuffer> ;
    public COLOR_1       : MDTBuffer<ArrayBuffer> ;
    public TANGENT       : MDTBuffer<ArrayBuffer> ;
    public INDICIES      : MDTBuffer<ArrayBuffer> ; 
}


/*
 private parseBufferFloat( v : GlTf, accessorId : number ) : Float32Array {
    const accessor  = v.accessors   [accessorId];
    const view      = v.bufferViews [accessor.bufferView];
    const buffer    = v.buffers     [view.buffer];
    const size      = accessorSizes[accessor.type] as number;
    return new Float32Array  ( buffer.uri , (accessor.byteOffset || 0) + (view.byteOffset || 0), accessor.count * size)
  } 


*/