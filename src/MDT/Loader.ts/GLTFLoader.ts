
import { GltfAsset, GltfLoader } from 'gltf-loader-ts';
import { Asset, GlTf } from 'gltf-loader-ts/lib/gltf';
import { MDTGeometri } from '../Mesh/MDTGeometri';
import { GTLFFile } from './Types/GLTFFile';
//import { GTLFFile } from './Types/GLTFFile';
//import { RawGLTFFile} from './Types/RawGLTFFile';

export class GLTFLoader{

    public constructor(){

    }

    public async Test( url : string ){
 
        let loader = new GltfLoader();
        let uri = './public/3dAssets/storage/Box.gltf';//'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF/BoxTextured.gltf';
        let asset = await loader.load(uri); 
        
        let verts   = await asset.accessorData( asset.gltf.meshes[0].primitives[0].attributes['POSITION']   );
        let norms   = await asset.accessorData( asset.gltf.meshes[0].primitives[0].attributes['NORMAL']     );
        let texCord0= await asset.accessorData( asset.gltf.meshes[0].primitives[0].attributes['TEXCOORD_0'] );
        
        var mesh = new MDTGeometri(verts,norms,texCord0)
        return mesh;
    } 
}