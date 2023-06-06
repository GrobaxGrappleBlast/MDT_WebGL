import { MDTFileMeshPrimitive } from "../../../FileLoading/LoadedFile/MDTFile";
import { IEnvironment } from "../../Environment";
import { GlAsset, MDTObject } from "../../Objects/Object";
import { MaterialBase } from "../Materials/MaterialBase"; 

export class MDTMeshPrimitive extends GlAsset{
 
    private _geometri       : MDTFileMeshPrimitive; 
    private vertexBuffer    : WebGLBuffer; 
    private faceIndexBuffer : WebGLBuffer;
    private vertexNormalBuffer : WebGLBuffer;
    private indexLength :number;

    public constructor(geometri : MDTFileMeshPrimitive ,env: IEnvironment){
        super(env);
        this._geometri = geometri;
   
        // Buffer for Vertecies.
        this.vertexBuffer = this.environment.gl.createBuffer();
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.environment.gl.bufferData(this.environment.gl.ARRAY_BUFFER, this._geometri.buffers.POSITION.data, this.environment.gl.STATIC_DRAW);
         
        // Buffer for Normals.
        this.vertexNormalBuffer = this.environment.gl.createBuffer();
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        this.environment.gl.bufferData(this.environment.gl.ARRAY_BUFFER, this._geometri.buffers.NORMAL.data, this.environment.gl.STATIC_DRAW);

        // buffer for the face indicies. 
        this.faceIndexBuffer = this.environment.gl.createBuffer();
        this.environment.gl.bindBuffer(this.environment.gl.ELEMENT_ARRAY_BUFFER, this.faceIndexBuffer);
        this.environment.gl.bufferData(this.environment.gl.ELEMENT_ARRAY_BUFFER, this._geometri.buffers.INDICIES.data, this.environment.gl.STATIC_DRAW);

        this.indexLength = this._geometri.buffers.INDICIES.length;

        // unbinding. 
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, null);  
    } 

    public draw(material : MaterialBase): void { 
        this._bind(material);
        this._draw(material);
        this.unbind(); 
    }

    public _bind(material : MaterialBase){ 
        
        // todo review this call here. 
        // should the material get the mesh, or should the mesh get the material?
        // especialy since it is only the material that know what type of shader attributes it has.

        // Vertex position
        this.environment.gl.bindBuffer              ( this.environment.gl.ARRAY_BUFFER, this.vertexBuffer); 
        this.environment.gl.vertexAttribPointer     ( material.vertexPosition, 3, this.environment.gl.FLOAT, false, 0, 0); 
        this.environment.gl.enableVertexAttribArray ( material.vertexPosition);

        // Normals.
        this.environment.gl.bindBuffer              ( this.environment.gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        this.environment.gl.vertexAttribPointer     ( material.vertexNormals, 3, this.environment.gl.FLOAT, false, 0, 0); 
        this.environment.gl.enableVertexAttribArray ( material.vertexNormals);


        // Assuming face indices are of type UNSIGNED_SHORT
        this.environment.gl.bindBuffer              ( this.environment.gl.ELEMENT_ARRAY_BUFFER, this.faceIndexBuffer);  
        
        return;
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