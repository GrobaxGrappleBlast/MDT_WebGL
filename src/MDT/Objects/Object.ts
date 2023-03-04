import { Environment, IEnvironment } from "../Environment";
import { Transform } from "./Transform";

export abstract class GlAsset{
    
    protected environment: IEnvironment;
    protected get gl(){ return this.environment.gl };

    public constructor(environment: IEnvironment){
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