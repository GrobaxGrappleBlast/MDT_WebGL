import { Camera } from "./Objects/Camera";


export class Environment{

    private objects : Object[];
    private mainCamera: Camera;
    private canvas : HTMLCanvasElement; 

    public gl : WebGLRenderingContext;  

    public  constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;  
        this.mainCamera = new Camera();
        this.gl = this.canvas.getContext('webgl');
        if(!this.gl){
            throw new Error(
            `Your Browser Does not support WebGl, And therefore the app cannot play.
            Please try again using a different Browser (A browser is a program such
            a Google Chrome, Firefox, Microsoft Edge and others.)`                  );
        } 
        this.gl.clearColor(0.3,0.3,0.3,0.9);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    async renderFrame(){
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }


}