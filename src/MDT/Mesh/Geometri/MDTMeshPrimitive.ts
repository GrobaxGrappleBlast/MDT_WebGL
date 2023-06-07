import { MDTFileMeshPrimitive } from "../../../FileLoading/LoadedFile/MDTFile";
import { IEnvironment } from "../../Environment";
import { GlAsset, MDTObject } from "../../Objects/Object";
import { MaterialBase } from "../Materials/MaterialBase"; 
import { StandardMaterial } from "../Materials/StandardMaterial";

export class MDTMeshPrimitive extends GlAsset{
 
    private _geometri       : MDTFileMeshPrimitive; 
    private vertexPositionBuffer            : WebGLBuffer; 
    private vertexNormalBuffer              : WebGLBuffer;
    private vertexTangentBuffer             : WebGLBuffer;
    private vertexUVCoordinatesBuffer_01    : WebGLBuffer;
    private vertexUVCoordinatesBuffer_02    : WebGLBuffer;


    private faceIndexBuffer : WebGLBuffer;
    
    private indexLength :number;

    public constructor(geometri : MDTFileMeshPrimitive ,env: IEnvironment){
        super(env);
        this._geometri = geometri;
   
        this.vertexPositionBuffer           = this.createBuffer(this.environment.gl.ARRAY_BUFFER        , this.environment.gl.STATIC_DRAW,this._geometri.buffers.POSITION   ?.data);
        this.vertexNormalBuffer             = this.createBuffer(this.environment.gl.ARRAY_BUFFER        , this.environment.gl.STATIC_DRAW,this._geometri.buffers.NORMAL     ?.data);
        this.vertexTangentBuffer            = this.createBuffer(this.environment.gl.ARRAY_BUFFER        , this.environment.gl.STATIC_DRAW,this._geometri.buffers.TANGENT    ?.data);
        this.vertexUVCoordinatesBuffer_01   = this.createBuffer(this.environment.gl.ARRAY_BUFFER        , this.environment.gl.STATIC_DRAW,this._geometri.buffers.TEXCOORD_0 ?.data);
        this.vertexUVCoordinatesBuffer_02   = this.createBuffer(this.environment.gl.ARRAY_BUFFER        , this.environment.gl.STATIC_DRAW,this._geometri.buffers.TEXCOORD_1 ?.data);
        this.faceIndexBuffer                = this.createBuffer(this.environment.gl.ELEMENT_ARRAY_BUFFER, this.environment.gl.STATIC_DRAW,this._geometri.buffers.INDICIES   ?.data);
        this.indexLength = this._geometri.buffers.INDICIES.length;

        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, null);// unbinding. 
    } 

    private createBuffer( bufferType:number, drawMethod : number , data : ArrayBuffer = null ) : WebGLBuffer{
        
        if(data == null )
            return null;
        
        var buffer = this.environment.gl.createBuffer();
        this.environment.gl.bindBuffer(bufferType, buffer);
        this.environment.gl.bufferData(bufferType, data, drawMethod);
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, null);  // unbind
        return buffer;
    }

    public draw(material : StandardMaterial): void { 
        this._bind(material);
        this._draw(material);
        this.unbind(); 
    }

    public _bind(material : StandardMaterial){ 
        
        // todo review this call here. 
        // should the material get the mesh, or should the mesh get the material?
        // especialy since it is only the material that know what type of shader attributes it has.

        // Vertex position 
        this.bindBufferToAttribute( this.vertexPositionBuffer           , material.vertexPosition   , this.environment.gl.ARRAY_BUFFER, 3, this.environment.gl.FLOAT);
        this.bindBufferToAttribute( this.vertexNormalBuffer             , material.vertexNormals    , this.environment.gl.ARRAY_BUFFER, 3, this.environment.gl.FLOAT);
        this.bindBufferToAttribute( this.vertexTangentBuffer            , material.vertexTangent    , this.environment.gl.ARRAY_BUFFER, 3, this.environment.gl.FLOAT);
        this.bindBufferToAttribute( this.vertexUVCoordinatesBuffer_01   , material.vertexUVCoords1  , this.environment.gl.ARRAY_BUFFER, 2, this.environment.gl.FLOAT);
        this.bindBufferToAttribute( this.vertexUVCoordinatesBuffer_02   , material.vertexUVCoords2  , this.environment.gl.ARRAY_BUFFER, 2, this.environment.gl.FLOAT);

        // Assuming face indices are of type UNSIGNED_SHORT
        this.environment.gl.bindBuffer              ( this.environment.gl.ELEMENT_ARRAY_BUFFER, this.faceIndexBuffer);  
        
        return;
    } 

    private bindBufferToAttribute( buffer : WebGLBuffer , materialAttributeIndex : number, bufferType:number , vectorSize : number, dataType : number, normalize : boolean = false, stride : number = 0, offset : number = 0){
        
        if(buffer == null)
            return;

        if(materialAttributeIndex < 0)
            return;
        
        this.environment.gl.bindBuffer              ( bufferType, buffer);
        this.environment.gl.vertexAttribPointer     ( materialAttributeIndex, vectorSize, dataType, normalize, stride, offset);
        this.environment.gl.enableVertexAttribArray ( materialAttributeIndex);
    }

    public _draw(material : MaterialBase){
        
        material.use();   
 
        this.environment.gl.drawElements( this.environment.gl.TRIANGLES             , this._geometri.buffers.POSITION.length / 3, this.environment.gl.UNSIGNED_SHORT, 0);
        this.environment.gl.bindBuffer  ( this.environment.gl.ELEMENT_ARRAY_BUFFER  , this.faceIndexBuffer );
        this.environment.gl.drawElements( this.environment.gl.TRIANGLES             , this.indexLength, this.environment.gl.UNSIGNED_SHORT, 0);
       
        return;
    }   
    public unbind(){
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, null);  
    }
}