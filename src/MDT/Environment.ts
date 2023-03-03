import { Core, gl } from "./Core";
import { Camera } from "./Objects/Camera";


export class Environment{

    private objects : Object[];
    private mainCamera: Camera;

    public constructor(){
        this.mainCamera = new Camera();
    }
    
}