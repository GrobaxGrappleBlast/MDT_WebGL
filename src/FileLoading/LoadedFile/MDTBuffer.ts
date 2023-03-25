import { AccessorComponentType } from '../GLTF/Interface/IGLTFAccessor';
import * as IGLTF from '../GLTF/Interface/IGLTFCombined';


interface AccessorSizes {
    [key: string]: BufferType;
  }  
class BufferType{
name:string;
size:number;
}
const BufferTypes : AccessorSizes =  {
SCALAR :  { name:"SCALAR",size: 1  } ,
VEC2   :  { name:"VEC2"  ,size: 2  } ,
VEC3   :  { name:"VEC3"  ,size: 3  } ,
VEC4   :  { name:"VEC4"  ,size: 4  } ,
MAT2   :  { name:"MAT2"  ,size: 4  } ,
MAT3   :  { name:"MAT3"  ,size: 9  } ,
MAT4   :  { name:"MAT4"  ,size: 16 } 
};

interface getSizeCall{
    () : number
}
 
export class BaseMDTBuffer<T extends ArrayBuffer>{
   
    public byteLength : number; 
    public length : number;
    public type : BufferType;
    public data : T;   
    public TypeName :string;
    public Name:string;

    public _ctor: { new (...args: any[]): T };
    public SIZE_PER_ELEMENT : () => number;
    
    protected SetCreateInstance( ctor: { new (...args: any[]): T }) {
        this._ctor = ctor;
    }  
}
export class MDTBuffer<T extends ArrayBuffer> extends BaseMDTBuffer<T>{   
    public FromRAW( 
            ctor : { new (...args: any[]): T }  ,
            type : AccessorComponentType        ,
            SIZE_PR_ELEMENT : getSizeCall       ,
            rawData : number[] 
        ): MDTBuffer<T>
    {
        this.TypeName = AccessorComponentType[type];
        this.SIZE_PER_ELEMENT = SIZE_PR_ELEMENT;
        this._ctor = ctor; 
        this.byteLength = rawData.length * this. SIZE_PER_ELEMENT();
        this.data = new this._ctor(rawData);   
        this.length = (rawData).length; 
        return this;
    }   
    public FromGLTF( 
            ctor : { new (...args: any[]): T } ,
            type : AccessorComponentType ,
            SIZE_PR_ELEMENT : getSizeCall,
            buffer: ArrayBuffer , accessor: IGLTF.Accessor, bufferView: IGLTF.BufferView 
        ): MDTBuffer<T>
        { 
            this.TypeName = AccessorComponentType[type];
            this.SIZE_PER_ELEMENT = SIZE_PR_ELEMENT;
            this._ctor = ctor; 
            const offset    = (accessor.byteOffset || 0) + (bufferView.byteOffset || 0);
            this.byteLength = bufferView.byteLength;
            this.length     = accessor.count; 
            this.data       = new this._ctor( buffer , offset , this.length);
            return this;
        }  
}
 

export class MDTBufferMaker{ 
    
    private constructor(){}
    private static instance: MDTBufferMaker = null; 
    
    public getInstance() : MDTBufferMaker{
        if(MDTBufferMaker.instance == null){
            MDTBufferMaker.instance = new MDTBufferMaker();
        }
        return MDTBufferMaker.instance;
    }
    
    private static _createRawBuffer  ( type : AccessorComponentType ,  raw : number[]) : MDTBuffer<Int8Array   > | MDTBuffer<Uint8Array  > | MDTBuffer<Int16Array  > | MDTBuffer<Uint16Array > | MDTBuffer<Uint32Array > | MDTBuffer<Float32Array> {
        switch(type){ 
            case AccessorComponentType.BYTE:            return new MDTBuffer<Int8Array   >().FromRAW(Int8Array   ,type, () => Int8Array   .BYTES_PER_ELEMENT, raw );
            case AccessorComponentType.UNSIGNED_BYTE:   return new MDTBuffer<Uint8Array  >().FromRAW(Uint8Array  ,type, () => Uint8Array  .BYTES_PER_ELEMENT, raw );        
            case AccessorComponentType.SHORT:           return new MDTBuffer<Int16Array  >().FromRAW(Int16Array  ,type, () => Int16Array  .BYTES_PER_ELEMENT, raw );
            case AccessorComponentType.UNSIGNED_SHORT:  return new MDTBuffer<Uint16Array >().FromRAW(Uint16Array ,type, () => Uint16Array .BYTES_PER_ELEMENT, raw );        
            case AccessorComponentType.UNSIGNED_INT:    return new MDTBuffer<Uint32Array >().FromRAW(Uint32Array ,type, () => Uint32Array .BYTES_PER_ELEMENT, raw );        
            case AccessorComponentType.FLOAT:           return new MDTBuffer<Float32Array>().FromRAW(Float32Array,type, () => Float32Array.BYTES_PER_ELEMENT, raw );
        }
    }
    public  static  createRAWBuffer  ( type : AccessorComponentType , raw : number[] , name? : string){
        let res : MDTBuffer<Int8Array> | MDTBuffer<Uint8Array> | MDTBuffer<Int16Array> | MDTBuffer<Uint16Array> | MDTBuffer<Uint32Array> | MDTBuffer<Float32Array> = null;
        res = MDTBufferMaker._createRawBuffer(type,raw);
        res.Name = name;
        return res;
    }
    private static _createGLTFBuffer ( type : AccessorComponentType , buffer: ArrayBufferLike , accessor?: IGLTF.Accessor, bufferView?: IGLTF.BufferView ){
        switch(type){
            case AccessorComponentType.BYTE:            return new MDTBuffer<Int8Array   >().FromGLTF(Int8Array   ,type, () => Int8Array   .BYTES_PER_ELEMENT, buffer, accessor,bufferView);
            case AccessorComponentType.UNSIGNED_BYTE:   return new MDTBuffer<Uint8Array  >().FromGLTF(Uint8Array  ,type, () => Uint8Array  .BYTES_PER_ELEMENT, buffer, accessor,bufferView);        
            case AccessorComponentType.SHORT:           return new MDTBuffer<Int16Array  >().FromGLTF(Int16Array  ,type, () => Int16Array  .BYTES_PER_ELEMENT, buffer, accessor,bufferView);
            case AccessorComponentType.UNSIGNED_SHORT:  return new MDTBuffer<Uint16Array >().FromGLTF(Uint16Array ,type, () => Uint16Array .BYTES_PER_ELEMENT, buffer, accessor,bufferView);        
            case AccessorComponentType.UNSIGNED_INT:    return new MDTBuffer<Uint32Array >().FromGLTF(Uint32Array ,type, () => Uint32Array .BYTES_PER_ELEMENT, buffer, accessor,bufferView);        
            case AccessorComponentType.FLOAT:           return new MDTBuffer<Float32Array>().FromGLTF(Float32Array,type, () => Float32Array.BYTES_PER_ELEMENT, buffer, accessor,bufferView);
        }
    }
    public  static  createGLTFBuffer ( type : AccessorComponentType , buffer: ArrayBufferLike , accessor?: IGLTF.Accessor, bufferView?: IGLTF.BufferView , name? : string){
        let res : MDTBuffer<Int8Array> | MDTBuffer<Uint8Array> | MDTBuffer<Int16Array> | MDTBuffer<Uint16Array> | MDTBuffer<Uint32Array> | MDTBuffer<Float32Array> = null;
        res = MDTBufferMaker._createGLTFBuffer(type,buffer,accessor,bufferView);
        res.Name = name;
        return res;
    }
}

