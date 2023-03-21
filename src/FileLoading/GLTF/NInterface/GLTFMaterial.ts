import { GlTfId } from "./GLTF";

export interface Image { // * Image data used to create a texture. Image **MAY** be referenced by an URI (or IRI) or a buffer view index.
    uri ?: string; //   * The URI (or IRI) of the image.
    mimeType ?: any | any | string; //   * The image's media type. This field **MUST** be defined when `bufferView` is defined.
    bufferView ?: GlTfId; //   * The index of the bufferView that contains the image. This field **MUST NOT** be defined when `uri` is defined.
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
    baseColorFactor ?: number[]; //   * The factors for the base color of the material.
    baseColorTexture ?: TextureInfo; //   * The base color texture.
    metallicFactor ?: number; //   * The factor for the metalness of the material.
    roughnessFactor ?: number; //   * The factor for the roughness of the material.
    metallicRoughnessTexture ?: TextureInfo; //   * The metallic-roughness texture.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface MaterialNormalTextureInfo {
  index ?: any;
  texCoord ?: any;
    scale ?: number; //   * The scalar parameter applied to each normal vector of the normal texture.
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
    pbrMetallicRoughness ?: MaterialPbrMetallicRoughness; //   * A set of parameter values that are used to define the metallic-roughness material model from Physically Based Rendering (PBR) methodology. When undefined, all the default values of `pbrMetallicRoughness` **MUST** apply.
    normalTexture ?: MaterialNormalTextureInfo; //   * The tangent space normal texture.
    occlusionTexture ?: MaterialOcclusionTextureInfo; //   * The occlusion texture.
    emissiveTexture ?: TextureInfo; //   * The emissive texture.
    emissiveFactor ?: number[]; //   * The factors for the emissive color of the material.
    alphaMode ?: any | any | any | string; //   * The alpha rendering mode of the material.
    alphaCutoff ?: number; //   * The alpha cutoff value of the material.
    doubleSided ?: boolean; //   * Specifies whether the material is double sided.
  [k: string]: any;
}
export interface Texture { // * A texture and its sampler.
    sampler ?: GlTfId; //   * The index of the sampler used by this texture. When undefined, a sampler with repeat wrapping and auto filtering **SHOULD** be used.
    source ?: GlTfId; //   * The index of the image used by this texture. When undefined, an extension or other mechanism **SHOULD** supply an alternate texture source, otherwise behavior is undefined.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}