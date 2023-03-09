import { mat4, vec2, vec3 } from "gl-matrix";
import { IOnChangePublisher, IOnChangeSubscriber } from "../../../MDTInterfaces/IOnChangeListener";
import { Environment, IEnvironment } from "../../Environment";
import { BaseObject, GlAsset } from "../Object"; 
import { ManouverableCamera } from "./ManouverableCamera";


abstract class MouseCamera extends ManouverableCamera{
    
    private isLeftButtonDown    = false;
    private isMiddleButtonDown  = false;
    private isRightButtonDown   = false;
    private lastMouseX = 0;
    private lastMouseY = 0;

    protected setUpControlls(canvas: HTMLCanvasElement){

        canvas.addEventListener("mousedown", (event: MouseEvent) => {
            event.preventDefault();
            if (event.button === 0) {
                console.log("MOUSE DOWN LEFT");
                this.isLeftButtonDown = true;
            } else if (event.button === 1) {
                console.log("MOUSE DOWN MID");
                this.isMiddleButtonDown = true;
            } else if (event.button === 2) {
                console.log("MOUSE DOWN RIGHT");
                this.isRightButtonDown = true;
            }
        });

        canvas.addEventListener("mouseup", (event: MouseEvent) => {
            event.preventDefault();
            
            if (event.button === 0) {
                console.log("MOUSE UP LEFT");
                this.isLeftButtonDown = false;
            } else if (event.button === 1) {
                console.log("MOUSE UP MID");
                this.isMiddleButtonDown = false;
            } else if (event.button === 2) {
                console.log("MOUSE UP Right");
                this.isRightButtonDown = false;
            }
        });

        canvas.addEventListener("mousemove", (event: MouseEvent) => {
            //console.log("MOUSE MOVE");
            const deltaX = event.clientX -  this.lastMouseX;
            const deltaY = event.clientY -  this.lastMouseY;

            if ( this.isLeftButtonDown) {
                // handle left mouse button drag
            }

            if ( this.isMiddleButtonDown) {
                // handle middle mouse button drag
            }

            if ( this.isRightButtonDown) {
                // handle right mouse button drag
            }

            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;
        });

        canvas.addEventListener("wheel", (event: WheelEvent) => {
            event.preventDefault();
            
            if(event.ctrlKey || event.metaKey){
                // Zoom 
                this.cameraZoom(event.deltaY);
            }else if(event.shiftKey){
                // Raise Looking Angle
                console.log("angle ");
                this.raiseTarget  ( event.deltaY );
            }else{
                // Panning
                //console.log("PAN ");
                this.cameraPan([event.deltaX, event.deltaY]);
            } 
        });

        canvas.addEventListener("scroll", (event: Event) => {
            event.preventDefault();
            console.log("MOUSE WHEEL SCROLL");
            
        }); 
    }
}

abstract class touchscreenCamera extends MouseCamera{

    protected TOUCH_ZOOM_MIN_LIMIT = 1;

    private isFirst = true;
    private last_ZOOM_Squarelength: number = 0; 
    private last_PANN_DeltaTouch  : number = 0;

    public constructor(environment: IEnvironment){
        super(environment);
        this.setUpControlls(environment.canvas);
    }

    private handleTouchStart(event: TouchEvent) {
        event.preventDefault();   
        console.log("HANDLE TOUCH START");
        switch(event.touches.length){
            case 2:

                console.log(`Touch at ${event.touches[0].clientX} , ${ event.touches[1].clientX}`);
                const deltaTouch : vec2 = [
                    Math.abs(event.touches[0].clientX - event.touches[1].clientX),
                    Math.abs(event.touches[0].clientY - event.touches[1].clientY)
                    ];
                const sqrLength = vec2.squaredLength(deltaTouch);

                if( sqrLength > this.TOUCH_ZOOM_MIN_LIMIT ){ 
                    if(this.isFirst){
                        this.last_ZOOM_Squarelength = sqrLength;
                        return;
                    }
                    this.cameraZoom( sqrLength - this.last_ZOOM_Squarelength );
                    this.last_ZOOM_Squarelength = sqrLength;
                }else{
                    this.cameraPan(deltaTouch);
                }
                break;
            default:
        } 
    }
      
    private handleTouchMove(event: TouchEvent) {
        event.preventDefault();
        console.log("HANDLE TOUCH MOVE");
    }

    protected  setUpControlls(canvas: HTMLCanvasElement){
        super.setUpControlls(canvas);
        canvas.addEventListener('touchstart', this.handleTouchStart, false);
        canvas.addEventListener('touchmove',  this.handleTouchMove , false);
    } 
}

export abstract class CameraController extends touchscreenCamera{

}