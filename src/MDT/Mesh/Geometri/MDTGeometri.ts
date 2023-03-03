


export class MDTGeometri{

    public Verticies   : Uint8Array;
    public Normals     : Uint8Array;
    public TEXCOORD_0  : Uint8Array;
    
    public constructor(Verticies:Uint8Array, Normals:Uint8Array, TexCoordinates:Uint8Array){
        this.Verticies = Verticies;
        this.Normals = Normals;
        this.TEXCOORD_0 = TexCoordinates;
    }
    
   

}