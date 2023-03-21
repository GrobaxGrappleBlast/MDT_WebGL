import { GlTfId } from "./GLTF";

export interface AnimationChannelTarget { // * The descriptor of the animated property.
    node ?: GlTfId; //   * The index of the node to animate. When undefined, the animated object **MAY** be defined by an extension.
    path : any | any | any | any | string; //   * The name of the node's TRS property to animate, or the `"weights"` of the Morph Targets it instantiates. For the `"translation"` property, the values that are provided by the sampler are the translation along the X, Y, and Z axes. For the `"rotation"` property, the values are a quaternion in the order (x, y, z, w), where w is the scalar. For the `"scale"` property, the values are the scaling factors along the X, Y, and Z axes.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface AnimationChannel { // * An animation channel combines an animation sampler with a target property being animated.
    sampler : GlTfId; //   * The index of a sampler in this animation used to compute the value for the target.
    target : AnimationChannelTarget; //   * The descriptor of the animated property.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface AnimationSampler { // * An animation sampler combines timestamps with a sequence of output values and defines an interpolation algorithm.
    input : GlTfId; //   * The index of an accessor containing keyframe timestamps.
    interpolation ?: any | any | any | string; //   * Interpolation algorithm.
    output : GlTfId; //   * The index of an accessor, containing keyframe output values.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Animation { // * A keyframe animation.
    channels : AnimationChannel[]; //   * An array of animation channels. An animation channel combines an animation sampler with a target property being animated. Different channels of the same animation **MUST NOT** have the same targets.
    samplers : AnimationSampler[]; //   * An array of animation samplers. An animation sampler combines timestamps with a sequence of output values and defines an interpolation algorithm.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}