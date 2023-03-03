
import { GltfLoader } from 'gltf-loader-ts'; 
import { MDTGeometri } from '../Mesh/Geometri/MDTGeometri'; 
//import { GTLFFile } from './Types/GLTFFile';
//import { RawGLTFFile} from './Types/RawGLTFFile';

export class MDTGLTFLoader{

    public constructor(){

    }

    public async Test( uri : string ){
 
        
        let loader = new GltfLoader();
        let asset = await loader.load(uri); 
        
        let verts   = await asset.accessorData( asset.gltf.meshes[0].primitives[0].attributes['POSITION']   );
        let norms   = await asset.accessorData( asset.gltf.meshes[0].primitives[0].attributes['NORMAL']     );
        let texCord0= await asset.accessorData( asset.gltf.meshes[0].primitives[0].attributes['TEXCOORD_0'] );
        
        var mesh = new MDTGeometri(verts,norms,texCord0)
        return mesh;
    } 
}