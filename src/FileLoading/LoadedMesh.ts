
export interface Buffer {
    data: Float32Array;// | Int16Array;
    size: number;
    type: string;
    componentType: BufferType;
    glBuffer: WebGLBuffer;
}

export enum BufferType {
    Float = 5126,
    Short = 5123,
}

export interface GLTFLoadedMesh{
    positions   : Buffer;
    normals     : Buffer;
    tangents    : Buffer;
    texCoord    : Buffer;
    joints      : Buffer;
    weights     : Buffer;
    material    : Buffer;
}