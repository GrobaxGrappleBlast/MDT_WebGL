import { BufferType, GLTFLoadedMesh } from '../LoadedMesh';
import * as gltf from './Interface/GTLF'
import { Mesh, Model , Node} from './Interface/Model';
import {Buffer } from './../LoadedMesh'
// SOURCE https://github.com/larsjarlvik/webgl-gltf/tree/master/src/webgl-gltf
 
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


// My Own Code. Inspired BY Above Source 

export class GLTFLoader{

    private getAccessor         ( gltf: gltf.GlTf, mesh: gltf.Mesh, attributeName: string){
        const attribute = mesh.primitives[0].attributes[attributeName];
        return gltf.accessors![attribute];
    };

    private readBufferFromFile  ( gltf: gltf.GlTf, buffers: ArrayBuffer[], accessor: gltf.Accessor){
        
        
        const bufferView    = gltf.bufferViews![accessor.bufferView as number]; 
        const size          = accessorSizes[accessor.type] as number;
        const componentType = accessor.componentType as BufferType;
        const type          = accessor.type;

        const data          = 
        componentType == BufferType.Float
            ? new Float32Array  (buffers[bufferView.buffer], (accessor.byteOffset || 0) + (bufferView.byteOffset || 0), accessor.count * size)
            : new Int16Array    (buffers[bufferView.buffer], (accessor.byteOffset || 0) + (bufferView.byteOffset || 0), accessor.count * size);
        return {
            size,
            data,
            type,
            componentType,
        } as Buffer;
    };

    private getBufferFromName   ( gltf: gltf.GlTf, buffers: ArrayBuffer[], mesh: gltf.Mesh, name: string):Buffer{
        if (mesh.primitives[0].attributes[name] === undefined) {
            return null;
        } 
        const accessor = this.getAccessor(gltf, mesh, name);
        const bufferData = this.readBufferFromFile(gltf, buffers, accessor);
        return bufferData;
    };

    private ReadBuffer ( buffer : gltf.Buffer ) : ArrayBuffer {
        
        console.log("BUFFERS START HERE")

        const data              = buffer.uri.split(':')[1]; // Extract encoding type
        const a                 = data.indexOf(',');
        const encodingArray     = data.substring(0, a).split(';');
        const RAWStringBuffer   = data.substring(a + 1);
        // --- --- --- --- --- --- --- --- --- --- --- --- ---
        // encodingArray = [application/octet-stream][base64]
        const byteLength   = buffer.byteLength;
        const encodingSpec = encodingArray[0];
        const encoding     = encodingArray[1];
        
        //this.data = this.decodeGLTFBuffer(buffer,encodingArray[1]);

        const encoder = new TextEncoder();
        const _buffer = encoder.encode(RAWStringBuffer).buffer;
        return _buffer  ;
    }; 

    private loadMesh            ( gltf: gltf.GlTf, mesh: gltf.Mesh, buffers: ArrayBuffer[]){
        const _mesh = {
            positions   : this.getBufferFromName( gltf, buffers, mesh, 'POSITION')  ,
            normals     : this.getBufferFromName( gltf, buffers, mesh, 'NORMAL')    ,
            tangents    : this.getBufferFromName( gltf, buffers, mesh, 'TANGENT')   ,
            texCoord    : this.getBufferFromName( gltf, buffers, mesh, 'TEXCOORD_0'),
            joints      : this.getBufferFromName( gltf, buffers, mesh, 'JOINTS_0')  ,
            weights     : this.getBufferFromName( gltf, buffers, mesh, 'WEIGHTS_0') ,
            material    : mesh.primitives[0].material,
        }; 
        return _mesh;
    };
    
    public async loadModel (uri: string){
        
        const response = await fetch(uri);
        const gltf = await response.json() as gltf.GlTf;
    
        if (gltf.accessors === undefined || gltf.accessors.length === 0) {
            throw new Error('GLTF File is missing accessors')
        } 

        
        const buffers : ArrayBuffer[] = [];
        gltf.buffers.forEach( buffer => {
            buffers.push( this.ReadBuffer(buffer));
        });

        const meshes = gltf.meshes!.map(m => this.loadMesh( gltf, m, buffers));


        
        return meshes;
    }; 
}
 