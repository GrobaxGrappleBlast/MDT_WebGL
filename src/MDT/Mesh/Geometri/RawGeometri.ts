
 

export class RawGeometri{

    public Verticies   : Float32Array;
    public FaceIndicies: Uint16Array;
    public TEXCOORD_0  : Float32Array;
    
    public constructor(Verticies:Float32Array, FaceIndicies:Uint16Array, TexCoordinates:Float32Array){
        this.Verticies = Verticies;
        this.FaceIndicies = FaceIndicies;
        this.TEXCOORD_0 = TexCoordinates; 
    }
    
   

}