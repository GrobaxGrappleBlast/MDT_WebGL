import { Core, gl } from "./Core";


export class Environment{

    public matrix_projection: number [] ;
    public matrix_view      : number [] ;
    public matrix_model     : number [] ;

    private prspkt_aspekt   : number;
    private prspkt_zNear    : number;
    private prspkt_zFar     : number; 
    private prspkt_FOV_RAD  : number;


    public constructor(){
        this.resetProjectionSettings();
    }






    public setProjectionSettings_Degree( aspect?:number , zNear?:number, zFar?:number, fieldOfViewDegree?:number ){
       this.setProjectionSettings_Radian(aspect,zNear,zFar,Core.degToRad(fieldOfViewDegree));
    }

    public setProjectionSettings_Radian( aspect?:number , zNear?:number, zFar?:number, fieldOfViewRadian?:number ){
        
        if(aspect == undefined) {   aspect = this.prspkt_aspekt;    }
        else                    {   this.prspkt_aspekt = aspect;    }

        if(zNear == undefined)  {   zNear = this.prspkt_zNear;    }
        else                    {   this.prspkt_zNear = zNear;    }

        if(zFar == undefined)   {   zFar = this.prspkt_zFar;    }
        else                    {   this.prspkt_zFar = zFar;    }
        
        if(fieldOfViewRadian == undefined)  {   fieldOfViewRadian   = this.prspkt_FOV_RAD;  }
        else                                {   this.prspkt_FOV_RAD = fieldOfViewRadian;    }
        
        this.recalc_projectionMatrix();
    }

    public resetProjectionSettings(aspect?:number , zNear?:number, zFar?:number, fieldOfViewDegree?:number){
        
        if(aspect == undefined) { this.prspkt_aspekt = gl.canvas.width / gl.canvas.height; }
        else                    { this.prspkt_aspekt = aspect; }

        if(zNear == undefined)  { this.prspkt_zNear = 1 }
        else                    { this.prspkt_zNear = zNear; }
        
        if(zFar == undefined)   { this.prspkt_zFar = 2000 }
        else                    { this.prspkt_zFar = zFar; }
        
        if(fieldOfViewDegree == undefined)  { this.prspkt_FOV_RAD = Core.degToRad(120) }
        else                                { this.prspkt_FOV_RAD = Core.degToRad(fieldOfViewDegree); }

        this. recalc_projectionMatrix();
    }

    private recalc_projectionMatrix(){
        this.matrix_projection = m4.perspective(this.prspkt_FOV_RAD, this.prspkt_aspekt, this.prspkt_zNear, this.prspkt_zFar);
    }

}