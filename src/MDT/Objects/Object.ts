import { Environment, IEnvironment } from "../Environment";
import { Transform } from "./Transform";


export abstract class BaseAsset{
    public PRINTS_LOG_TO_CONSOLE = false;
    public toConsole(a : any){
        if(this.PRINTS_LOG_TO_CONSOLE){
            console.log(a);
        }
    }
}

export abstract class GlAsset extends BaseAsset {
    
    protected environment: IEnvironment;
    protected get gl(){ return this.environment.gl };

    public constructor(environment: IEnvironment){
        super();
        this.environment = environment;
    }

   
}
export abstract class BaseObject extends GlAsset{

    public transform : Transform;
    public constructor(environment: IEnvironment){
        super(environment);
        this.transform = new Transform();
    }
    
    public updateTransform(): void {
        this.transform.update();
    }
}

export abstract class MDTObject extends BaseObject {

    public constructor(environment: IEnvironment){
        super(environment);
    }

    public abstract draw( ) : void;
}