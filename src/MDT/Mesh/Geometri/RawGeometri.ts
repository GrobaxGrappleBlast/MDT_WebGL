
 

export class RawGeometri{

    public Verticies   : Float32Array;
    public Normals     : Float32Array;
    public TEXCOORD_0  : Float32Array;
    
    public constructor(Verticies:Float32Array, Normals:Float32Array, TexCoordinates:Float32Array){
        this.Verticies = Verticies;
        this.Normals = Normals;
        this.TEXCOORD_0 = TexCoordinates; 
    }
    
   

}