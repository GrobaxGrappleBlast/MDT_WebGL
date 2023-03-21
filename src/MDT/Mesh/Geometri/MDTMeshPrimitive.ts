import { IEnvironment } from "../../Environment";
import { GlAsset, MDTObject } from "../../Objects/Object";
import { MaterialBase } from "../Materials/MaterialBase";
import { RawGeometri } from "./RawGeometri";

export class MDTMeshPrimitive extends GlAsset{


    private _geometri       : RawGeometri; 
    private vertexBuffer    : WebGLBuffer; 
    private faceIndexBuffer : WebGLBuffer;


    public constructor(geometri : RawGeometri ,env: IEnvironment){
        super(env);
        this._geometri = geometri;

        this.vertexBuffer = this.environment.gl.createBuffer();
        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.environment.gl.bufferData(this.environment.gl.ARRAY_BUFFER, this._geometri.Verticies, this.environment.gl.STATIC_DRAW);
        
        this.faceIndexBuffer = this.environment.gl.createBuffer();
        this.environment.gl.bindBuffer(this.environment.gl.ELEMENT_ARRAY_BUFFER, this.faceIndexBuffer);
        this.environment.gl.bufferData(this.environment.gl.ELEMENT_ARRAY_BUFFER,   this._geometri.indices,this.environment.gl.STATIC_DRAW);

        this.environment.gl.bindBuffer(this.environment.gl.ARRAY_BUFFER, null);  
    } 
    public draw(material : MaterialBase): void {
        this._bind(material);
        this._draw(material);
    }
    public _bind(material : MaterialBase){
        this.environment.gl.bindBuffer              ( this.environment.gl.ARRAY_BUFFER, this.vertexBuffer); 
        this.environment.gl.vertexAttribPointer     ( material.vertexPosition, 3, this.environment.gl.FLOAT, false, 0, 0); 
        this.environment.gl.enableVertexAttribArray ( material.vertexPosition);
        
        this.environment.gl.bindBuffer(this.environment.gl.ELEMENT_ARRAY_BUFFER, this.faceIndexBuffer);
        return;
    } 
    public _draw(material : MaterialBase){
        material.use(); 
        //this.environment.gl.drawArrays( this.environment.gl.TRIANGLES,0, this._geometri.Verticies.length /3  );
        this.environment.gl.drawElements( this.environment.gl.TRIANGLES, this._geometri.Verticies.length / 3, this.environment.gl.UNSIGNED_SHORT, 0);
        return;
    }   
}