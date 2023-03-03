import { Environment } from "../Environment";
import { Transform } from "./Transform";

export abstract class GlAsset{
    
    protected environment: Environment;
    protected get gl(){ return this.environment.gl };

    public constructor(environment: Environment){
        this.environment = environment;
    }
}
export abstract class BaseObject extends GlAsset{

    public transform : Transform;
    public constructor(environment: Environment){
        super(environment);
        this.transform = new Transform();
    }

}

export abstract class Object extends BaseObject {

    public constructor(environment: Environment){
        super(environment);
    }

    public abstract draw( ) : void;
}