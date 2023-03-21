//https://github.com/larsjarlvik/webgl-gltf/tree/master/src/webgl-gltf/types
// REGEX Used
// find /\*\*.*\n(.*)\n.*\*/\n(.*)
// replace $2 //$1

// find '(.*?)'(.*)
// replace $1 $2

export type GlTfId = number;
export interface AccessorSparseIndices { // * Indices of those attributes that deviate from their initialization value.
    bufferView : GlTfId; //   * The index of the bufferView with sparse indices. Referenced bufferView can't have ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target.
    byteOffset ?: number; //   * The offset relative to the start of the bufferView in bytes. Must be aligned.
    componentType : 5121 | 5123 | 5125 | number; //   * The indices data type.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface AccessorSparseValues { // * Array of size `accessor.sparse.count` times number of components storing the displaced accessor attributes pointed by `accessor.sparse.indices`.
    bufferView : GlTfId; //   * The index of the bufferView with sparse values. Referenced bufferView can't have ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER target.
    byteOffset ?: number; //   * The offset relative to the start of the bufferView in bytes. Must be aligned.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface AccessorSparse { // * Sparse storage of attributes that deviate from their initialization value.
    count : number; //   * Number of entries stored in the sparse array.
    indices : AccessorSparseIndices; //   * Index array of size `count` that points to those accessor attributes that deviate from their initialization value. Indices must strictly increase.
    values : AccessorSparseValues; //   * Array of size `count` times number of components, storing the displaced accessor attributes pointed by `indices`. Substituted values must have the same `componentType` and number of components as the base accessor.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}

/// A typed view into a bufferView.  A bufferView contains raw binary data.  An accessor provides a typed view into a bufferView or a subset of a bufferView similar to how WebGL's `vertexAttribPointer()` defines an attribute in a buffer.
export interface Accessor {
  bufferView?   : GlTfId; // The index of the bufferView.
  byteOffset?   : number; //The offset relative to the start of the bufferView in bytes.
  componentType : 5120 | 5121 | 5122 | 5123 | 5125 | 5126 | number; // The datatype of components in the attribute.
  normalized?   : boolean;//Specifies whether integer data values should be normalized.
  count         : number;//The number of attributes referenced by this accessor.
  type          : string = 'SCALAR'| 'VEC2' | 'VEC3' | 'VEC4' | 'MAT2' | 'MAT3' | 'MAT4' | string;//Specifies if the attribute is a scalar, vector, or matrix.
  max?          : number[]; //Maximum value of each component in this attribute.
  min?          : number[]; //Minimum value of each component in this attribute.
  sparse?       : AccessorSparse;//Sparse storage of attributes that deviate from their initialization value.
  name?         : any;
  extensions?   : any;
  extras?       : any;
  [k: string]     : any;
}
export interface AnimationChannelTarget { // * The index of the node and TRS property that an animation channel targets.
    node ?: GlTfId; //   * The index of the node to target.
    path : 'translation' | 'rotation' | 'scale' | 'weights' | string; //   * The name of the node's TRS property to modify, or the "weights" of the Morph Targets it instantiates. For the "translation" property, the values that are provided by the sampler are the translation along the x, y, and z axes. For the "rotation" property, the values are a quaternion in the order (x, y, z, w), where w is the scalar. For the "scale" property, the values are the scaling factors along the x, y, and z axes.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface AnimationChannel { // * Targets an animations sampler at a node s property.
    sampler : GlTfId; //   * The index of a sampler in this animation used to compute the value for the target.
    target : AnimationChannelTarget; //   * The index of the node and TRS property to target.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface AnimationSampler { // * Combines input and output accessors with an interpolation algorithm to define a keyframe graph (but not its target).
    input : GlTfId; //   * The index of an accessor containing keyframe input values, e.g., time.
    interpolation ?: 'LINEAR' | 'STEP' | 'CUBICSPLINE' | string; //   * Interpolation algorithm.
    output : GlTfId; //   * The index of an accessor, containing keyframe output values.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Animation { // * A keyframe animation.
    channels : AnimationChannel[]; //   * An array of channels, each of which targets an animation's sampler at a node's property. Different channels of the same animation can't have equal targets.
    samplers : AnimationSampler[]; //   * An array of samplers that combines input and output accessors with an interpolation algorithm to define a keyframe graph (but not its target).
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Asset { // * Metadata about the glTF asset.
    copyright ?: string; //   * A copyright message suitable for display to credit the content creator.
    generator ?: string; //   * Tool that generated this glTF model.  Useful for debugging.
    version : string; //   * The glTF version that this asset targets.
    minVersion ?: string; //   * The minimum glTF version that this asset targets.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Buffer { // * A buffer points to binary geometry, animation, or skins.
    uri ?: string; //   * The uri of the buffer.
    byteLength : number; //   * The length of the buffer in bytes.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface BufferView { // * A view into a buffer generally representing a subset of the buffer.
    buffer : GlTfId; //   * The index of the buffer.
    byteOffset ?: number; //   * The offset into the buffer in bytes.
    byteLength : number; //   * The total byte length of the buffer view.
    byteStride ?: number; //   * The stride, in bytes.
    target ?: 34962 | 34963 | number; //   * The target that the GPU buffer should be bound to.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface CameraOrthographic { // * An orthographic camera containing properties to create an orthographic projection matrix.
    xmag : number; //   * The floating-point horizontal magnification of the view. Must not be zero.
    ymag : number; //   * The floating-point vertical magnification of the view. Must not be zero.
    zfar : number; //   * The floating-point distance to the far clipping plane. `zfar` must be greater than `znear`.
    znear : number; //   * The floating-point distance to the near clipping plane.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface CameraPerspective { // * A perspective camera containing properties to create a perspective projection matrix.
    aspectRatio ?: number; //   * The floating-point aspect ratio of the field of view.
    yfov : number; //   * The floating-point vertical field of view in radians.
    zfar ?: number; //   * The floating-point distance to the far clipping plane.
    znear : number; //   * The floating-point distance to the near clipping plane.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Camera { // * A camera's projection.  A node can reference a camera to apply a transform to place the camera in the scene.
    orthographic ?: CameraOrthographic; //   * An orthographic camera containing properties to create an orthographic projection matrix.
    perspective ?: CameraPerspective; //   * A perspective camera containing properties to create a perspective projection matrix.
    type : 'perspective' | 'orthographic' | string; //   * Specifies if the camera uses a perspective or orthographic projection.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Image { // * Image data used to create a texture. Image can be referenced by URI or `bufferView` index. `mimeType` is required in the latter case.
    uri ?: string; //   * The uri of the image.
    mimeType ?: 'image/jpeg' | 'image/png' | string; //   * The image's MIME type. Required if `bufferView` is defined.
    bufferView ?: GlTfId; //   * The index of the bufferView that contains the image. Use this instead of the image's uri property.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface TextureInfo { // * Reference to a texture.
    index : GlTfId; //   * The index of the texture.
    texCoord ?: number; //   * The set index of texture's TEXCOORD attribute used for texture coordinate mapping.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface MaterialPbrMetallicRoughness { // * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology.
    baseColorFactor ?: number[]; //   * The material's base color factor.
    baseColorTexture ?: TextureInfo; //   * The base color texture.
    metallicFactor ?: number; //   * The metalness of the material.
    roughnessFactor ?: number; //   * The roughness of the material.
    metallicRoughnessTexture ?: TextureInfo; //   * The metallic-roughness texture.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface MaterialNormalTextureInfo {
  index ?: any;
  texCoord ?: any;
    scale ?: number; //   * The scalar multiplier applied to each normal vector of the normal texture.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface MaterialOcclusionTextureInfo {
  index ?: any;
  texCoord ?: any;
    strength ?: number; //   * A scalar multiplier controlling the amount of occlusion applied.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Material { // * The material appearance of a primitive.
  name ?: any;
  extensions ?: any;
  extras ?: any;
    pbrMetallicRoughness ?: MaterialPbrMetallicRoughness; //   * A set of parameter values that are used to define the metallic-roughness material model from Physically-Based Rendering (PBR) methodology. When not specified, all the default values of `pbrMetallicRoughness` apply.
    normalTexture ?: MaterialNormalTextureInfo; //   * The normal map texture.
    occlusionTexture ?: MaterialOcclusionTextureInfo; //   * The occlusion map texture.
    emissiveTexture ?: TextureInfo; //   * The emissive map texture.
    emissiveFactor ?: number[]; //   * The emissive color of the material.
    alphaMode ?: 'OPAQUE' | 'MASK' | 'BLEND' | string; //   * The alpha rendering mode of the material.
    alphaCutoff ?: number; //   * The alpha cutoff value of the material.
    doubleSided ?: boolean; //   * Specifies whether the material is double sided.
  [k: string]: any;
}
export interface MeshPrimitive { // * Geometry to be rendered with the given material.
    attributes : { //   * A dictionary object, where each key corresponds to mesh attribute semantic and each value is the index of the accessor containing attribute's data.
    [k: string]: GlTfId;
  };
    indices ?: GlTfId; //   * The index of the accessor that contains the indices.
    material ?: GlTfId; //   * The index of the material to apply to this primitive when rendering.
    mode ?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | number; //   * The type of primitives to render.
    targets ?: { //   * An array of Morph Targets, each  Morph Target is a dictionary mapping attributes (only `POSITION`, `NORMAL`, and `TANGENT` supported) to their deviations in the Morph Target.
    [k: string]: GlTfId;
  }[];
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Mesh { // * A set of primitives to be rendered.  A node can contain one mesh.  A node's transform places the mesh in the scene.
    primitives : MeshPrimitive[]; //   * An array of primitives, each defining geometry to be rendered with a material.
    weights ?: number[]; //   * Array of weights to be applied to the Morph Targets.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Node { // * A node in the node hierarchy.  When the node contains `skin`, all `mesh.primitives` must contain `JOINTS_0` and `WEIGHTS_0` attributes.  A node can have either a `matrix` or any combination of `translation`/`rotation`/`scale` (TRS) properties. TRS properties are converted to matrices and postmultiplied in the `T * R * S` order to compose the transformation matrix; first the scale is applied to the vertices, then the rotation, and then the translation. If none are provided, the transform is the identity. When a node is targeted for animation (referenced by an animation.channel.target), only TRS properties may be present; `matrix` will not be present.
    camera ?: GlTfId; //   * The index of the camera referenced by this node.
    children ?: GlTfId[]; //   * The indices of this node's children.
    skin ?: GlTfId; //   * The index of the skin referenced by this node.
    matrix ?: number[]; //   * A floating-point 4x4 transformation matrix stored in column-major order.
    mesh ?: GlTfId; //   * The index of the mesh in this node.
    rotation ?: number[]; //   * The node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar.
    scale ?: number[]; //   * The node's non-uniform scale, given as the scaling factors along the x, y, and z axes.
    translation ?: number[]; //   * The node's translation along the x, y, and z axes.
    weights ?: number[]; //   * The weights of the instantiated Morph Target. Number of elements must match number of Morph Targets of used mesh.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Sampler { // * Texture sampler properties for filtering and wrapping modes.
    magFilter ?: 9728 | 9729 | number; //   * Magnification filter.
    minFilter ?: 9728 | 9729 | 9984 | 9985 | 9986 | 9987 | number; //   * Minification filter.
    wrapS ?: 33071 | 33648 | 10497 | number; //   * s wrapping mode.
    wrapT ?: 33071 | 33648 | 10497 | number; //   * t wrapping mode.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Scene { // * The root nodes of a scene.
    nodes ?: GlTfId[]; //   * The indices of each root node.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Skin { // * Joints and matrices defining a skin.
    inverseBindMatrices ?: GlTfId; //   * The index of the accessor containing the floating-point 4x4 inverse-bind matrices.  The default is that each matrix is a 4x4 identity matrix, which implies that inverse-bind matrices were pre-applied.
    skeleton ?: GlTfId; //   * The index of the node used as a skeleton root.
    joints : GlTfId[]; //   * Indices of skeleton nodes, used as joints in this skin.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Texture { // * A texture and its sampler.
    sampler ?: GlTfId; //   * The index of the sampler used by this texture. When undefined, a sampler with repeat wrapping and auto filtering should be used.
    source ?: GlTfId; //   * The index of the image used by this texture. When undefined, it is expected that an extension or other mechanism will supply an alternate texture source, otherwise behavior is undefined.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface GlTf { // * The root object for a glTF asset.
    extensionsUsed ?: string[]; //   * Names of glTF extensions used somewhere in this asset.
    extensionsRequired ?: string[]; //   * Names of glTF extensions required to properly load this asset.
    accessors ?: Accessor[]; //   * An array of accessors.
    animations ?: Animation[]; //   * An array of keyframe animations.
    asset : Asset; //   * Metadata about the glTF asset.
    buffers ?: Buffer[]; //   * An array of buffers.
    bufferViews ?: BufferView[]; //   * An array of bufferViews.
    cameras ?: Camera[]; //   * An array of cameras.
    images ?: Image[]; //   * An array of images.
    materials ?: Material[]; //   * An array of materials.
    meshes ?: Mesh[]; //   * An array of meshes.
    nodes ?: Node[]; //   * An array of nodes.
    samplers ?: Sampler[]; //   * An array of samplers.
    scene ?: GlTfId; //   * The index of the default scene.
    scenes ?: Scene[]; //   * An array of scenes.
    skins ?: Skin[]; //   * An array of skins.
    textures ?: Texture[]; //   * An array of textures.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}