
import { MDTGLTFLoader } from './Loader.ts/GLTFLoader';  
import { Environment } from './Environment'; 

(window as any).MDTStart = (canvas : HTMLCanvasElement) :Core => {
    const MDTEngine = new Core(canvas);
    return MDTEngine;
}

export class Core {
    
    private environments : Environment[] = []; 
    public  constructor(canvas : HTMLCanvasElement) { 
        this.StartMDT( canvas );
    }

    private async StartMDT(canvas : HTMLCanvasElement ){ 
        var environment = new Environment( "Start" , canvas);  
        var load        = new MDTGLTFLoader();
        var geometri    = await load.Test("./public/3dAssets/storage/Box.gltf"); 
        environment.addObject("first",geometri);
        this.environments.push(environment);
        this.Loop();
    }
    
    public Loop(){ 
        this.environments.forEach( p => p.renderFrame() )
        requestAnimationFrame(this.Loop.bind(this));
    } 
} 