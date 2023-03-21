export interface CameraOrthographic { // * An orthographic camera containing properties to create an orthographic projection matrix.
    xmag : number; //   * The floating-point horizontal magnification of the view. This value **MUST NOT** be equal to zero. This value **SHOULD NOT** be negative.
    ymag : number; //   * The floating-point vertical magnification of the view. This value **MUST NOT** be equal to zero. This value **SHOULD NOT** be negative.
    zfar : number; //   * The floating-point distance to the far clipping plane. This value **MUST NOT** be equal to zero. `zfar` **MUST** be greater than `znear`.
    znear : number; //   * The floating-point distance to the near clipping plane.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface CameraPerspective { // * A perspective camera containing properties to create a perspective projection matrix.
    aspectRatio ?: number; //   * The floating-point aspect ratio of the field of view.
    yfov : number; //   * The floating-point vertical field of view in radians. This value **SHOULD** be less than π.
    zfar ?: number; //   * The floating-point distance to the far clipping plane.
    znear : number; //   * The floating-point distance to the near clipping plane.
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}
export interface Camera { // * A camera's projection.  A node **MAY** reference a camera to apply a transform to place the camera in the scene.
    orthographic ?: CameraOrthographic; //   * An orthographic camera containing properties to create an orthographic projection matrix. This property **MUST NOT** be defined when `perspective` is defined.
    perspective ?: CameraPerspective; //   * A perspective camera containing properties to create a perspective projection matrix. This property **MUST NOT** be defined when `orthographic` is defined.
    type : any | any | string; //   * Specifies if the camera uses a perspective or orthographic projection.
  name ?: any;
  extensions ?: any;
  extras ?: any;
  [k: string]: any;
}