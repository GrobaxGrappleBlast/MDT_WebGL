
    import { vec2, vec3 } from "gl-matrix"; 
    import { MDTFileMeshPrimitive } from "../FileLoading/LoadedFile/MDTFile";
    import { StandardMaterial } from "./Mesh/Materials/StandardMaterial";
    import { Mesh } from "./Mesh/Mesh";
    import { Camera } from "./Objects/Camera/Camera";
    import { BaseAsset, MDTObject } from "./Objects/Object";
import { RenderPassCombinator } from "./Mesh/Materials/RenderPassCombinator/RenderPassComb";

    export interface IEnvironment{
        gl : WebGLRenderingContext;
        camera : Camera;
        canvas: HTMLCanvasElement;
        getScreenSize() : vec2 ;
    }
    export class Environment extends BaseAsset implements IEnvironment {

        private objects : {[name:string]:MDTObject}= {};
        public  camera  : Camera;
        public  canvas  : HTMLCanvasElement; 

        public gl : WebGLRenderingContext;
        private origo : vec3 = [0,0,0];  
        

        public constructor( CallerID :String , canvas : HTMLCanvasElement ) {
            super(); 
    
            // todo : reeval this is suboptimal because the camera's matrix is made at constructor, but values are given after construction, and then we ask it to recalculate. 
            this.canvas = canvas;  
            this.camera = new Camera(this);
            this.camera.transform.location =  [4,4,0];
            this.gl = this.canvas.getContext('webgl');
            
            if(!this.gl){
                throw new Error(`
                Your Browser Does not support WebGl, And therefore the app cannot play.
                Please try again using a different Browser (A browser is a program such
                a Google Chrome, Firefox, Microsoft Edge and others.)
                `);
                return null;
            }    
            this.gl.clearColor(0.3,0.3,0.3,0.9);
            this.gl.clear   (this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);  
            this.gl.enable  (this.gl.DEPTH_TEST); 
    
            // width : 1010. height : 695 
            this.updateCameraForCanvas(canvas.clientWidth,canvas.clientHeight,canvas);
            window.addEventListener('resize', () => {
                this.updateCameraForCanvas(canvas.clientWidth,canvas.clientHeight,canvas);
            }); 

            this.framebufferConstruct();
        }

        private updateCameraForCanvas(width:number, height:number, canvas:HTMLCanvasElement){ 
            
            this.gl.canvas.height = height;
            this.gl.canvas.width  = width;
            
            height = this.gl.canvas.height;
            width  = this.gl.canvas.width;

            this.gl.viewport (0,0,  width,  height); 
            this.camera.aspectRatio = (width) / (height);
            // we are giving these the "wrong" information, but it results in the behavior we want.
            this.camera.calcFOVFromScreenWidth( height, width); 
            this.camera.recalculate(); 
        } 
        public addObject( key:string , geo : MDTFileMeshPrimitive ){
            this.objects[key] = new Mesh( this, [geo] , new StandardMaterial(this));
            this.objects[key].transform.location = this.origo;
        } 
        public addObjects( key:string , geo : MDTFileMeshPrimitive[] ){
            this.objects[key] = new Mesh( this, geo , new StandardMaterial(this));
            this.objects[key].transform.location = this.origo;
        } 
        public renderFrame(){ 

            this.camera.update();
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            for(const key in this.objects){
                this.objects[key].draw();
            } 
        }  
        

        private frameTexture: WebGLTexture;
        private frameBuffer: WebGLFramebuffer;
        private frameBufferAttachment : number;
        private renderBuffer: WebGLRenderbuffer;
        private renderPassCominer : RenderPassCombinator;

        public framebufferConstruct() {
            // Create and bind the frame buffer
            this.frameBuffer    = this.gl.createFramebuffer();
            this.frameTexture   = this.gl.createTexture(); 
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);

            // //////////////////////////////////////////////////////////
            // // TEXTURE // TEXTURE // TEXTURE // TEXTURE // TEXTURE // 
            // //////////////////////////////////////////////////////////
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.frameTexture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.canvas.width, this.gl.canvas.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            
            // //////////////////////////////////////////////////////////
            // // ATTACHMENT // ATTACHMENT // ATTACHMENT // ATTACHMENT //
            // //////////////////////////////////////////////////////////
            this.frameBufferAttachment = this.gl.COLOR_ATTACHMENT0;
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.frameBufferAttachment, this.gl.TEXTURE_2D, this.frameTexture, 0);


            // //////////////////////////////////////////////////////////
            // // DETACHMENT // DETACHMENT // DETACHMENT // DETACHMENT //
            // //////////////////////////////////////////////////////////
            this.gl.bindTexture(this.gl.TEXTURE_2D, null );
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

            this.renderPassCominer = new RenderPassCombinator(this);
        }  

        public async renderFrameToFrameBuffer(){


            // Bind the frame buffer
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.frameTexture);

            // CLEARING
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            // this.gl.clearColor(0, 0, 0, 0); 
            // this.gl.clear(this.gl.COLOR_BUFFER_BIT| this.gl.DEPTH_BUFFER_BIT);

            // Render objects to the frame buffer
            this.renderFrame();

            console.log("STOP HERE");
            // UNBIND
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);

            // CLEARING
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            // this.gl.clearColor(0, 0, 0, 0); 
            // this.gl.clear(this.gl.COLOR_BUFFER_BIT| this.gl.DEPTH_BUFFER_BIT);

            // COMBINING PASSES 
            this.renderPassCominer.renderCombinedPass(this.frameTexture);
        }



        public getScreenSize() : vec2 {
            var size : vec2 = [this.canvas.width,this.canvas.height];
            return size;
        }


    }