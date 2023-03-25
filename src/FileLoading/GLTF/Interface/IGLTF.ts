import { Accessor } from "./IGLTFAccessor";
import { Buffer,BufferView } from "./IGLTFBuffer";
import { Mesh } from "./IGLTFMesh";
import { Asset, Camera, Material , Image, Sampler, GlTfId, Scene, Skin, Texture} from "./IGLTFOther";

// The root object for a glTF asset.
export interface GlTf {
  // Names of glTF extensions used in this asset.
  extensionsUsed ?: string[];
  // Names of glTF extensions required to properly load this asset.
  extensionsRequired ?: string[];
  // An array of accessors.
  accessors ?: Accessor[];
  // An array of keyframe animations.
  animations ?: Animation[];
  // Metadata about the glTF asset.
  asset : Asset;
  // An array of buffers.
  buffers ?: Buffer[];
  // An array of bufferViews.
  bufferViews ?: BufferView[];
  // An array of cameras.
  cameras ?: Camera[];
  // An array of images.
  images ?: Image[];
  // An array of materials.
  materials ?: Material[];
  // An array of meshes.
  meshes ?: Mesh[];
  // An array of nodes.
  nodes ?: Node[];
  // An array of samplers.
  samplers ?: Sampler[];
  // The index of the default scene.
  scene ?: GlTfId;
  // An array of scenes.
  scenes ?: Scene[];
  // An array of skins.
  skins ?: Skin[];
  // An array of textures.
  textures ?: Texture[];
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}