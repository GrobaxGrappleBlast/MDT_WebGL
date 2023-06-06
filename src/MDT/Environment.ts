
    import { vec2, vec3 } from "gl-matrix"; 
    import { MDTFileMeshPrimitive } from "../FileLoading/LoadedFile/MDTFile";
    import { StandardMaterial } from "./Mesh/Materials/StandardMaterial";
    import { Mesh } from "./Mesh/Mesh";
    import { Camera } from "./Objects/Camera/Camera";
    import { BaseAsset, MDTObject } from "./Objects/Object";

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

        public async renderFrame(){ 

            this.camera.update();
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            for(const key in this.objects){
                this.objects[key].draw();
            } 
        }  

    
        public getScreenSize() : vec2 {
            var size : vec2 = [this.canvas.width,this.canvas.height];
            return size;
        }


    }