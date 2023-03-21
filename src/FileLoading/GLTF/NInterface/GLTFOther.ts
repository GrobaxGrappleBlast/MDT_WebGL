import { GlTfId } from "./GLTF";

export interface Asset { // * Metadata about the glTF asset.
    copyright ?: string; //   * A copyright message suitable for display to credit the content creator.
    generator ?: string; //   * Tool that generated this glTF model.  Useful for debugging.
    version : string; //   * The glTF version in the form of `<major>.<minor>` that this asset targets.
    minVersion ?: string; //   * The minimum glTF version in the form of `<major>.<minor>` that this asset targets. This property **MUST NOT** be greater than the asset version.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}



export interface Node { // * A node in the node hierarchy.  When the node contains `skin`, all `mesh.primitives` **MUST** contain `JOINTS_0` and `WEIGHTS_0` attributes.  A node **MAY** have either a `matrix` or any combination of `translation`/`rotation`/`scale` (TRS) properties. TRS properties are converted to matrices and postmultiplied in the `T * R * S` order to compose the transformation matrix; first the scale is applied to the vertices, then the rotation, and then the translation. If none are provided, the transform is the identity. When a node is targeted for animation (referenced by an animation.channel.target), `matrix` **MUST NOT** be present.
    camera ?: GlTfId; //   * The index of the camera referenced by this node.
    children ?: GlTfId[]; //   * The indices of this node's children.
    skin ?: GlTfId; //   * The index of the skin referenced by this node.
    matrix ?: number[]; //   * A floating-point 4x4 transformation matrix stored in column-major order.
    mesh ?: GlTfId; //   * The index of the mesh in this node.
    rotation ?: number[]; //   * The node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar.
    scale ?: number[]; //   * The node's non-uniform scale, given as the scaling factors along the x, y, and z axes.
    translation ?: number[]; //   * The node's translation along the x, y, and z axes.
    weights ?: number[]; //   * The weights of the instantiated morph target. The number of array elements **MUST** match the number of morph targets of the referenced mesh. When defined, `mesh` **MUST** also be defined.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Sampler { // * Texture sampler properties for filtering and wrapping modes.
    magFilter ?: number | number | number; //   * Magnification filter.
    minFilter ?: number | number | number | number | number | number | number; //   * Minification filter.
    wrapS ?: number | number | number | number; //   * S (U) wrapping mode.
    wrapT ?: number | number | number | number; //   * T (V) wrapping mode.
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
    inverseBindMatrices ?: GlTfId; //   * The index of the accessor containing the floating-point 4x4 inverse-bind matrices.
    skeleton ?: GlTfId; //   * The index of the node used as a skeleton root.
    joints : GlTfId[]; //   * Indices of skeleton nodes, used as joints in this skin.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}