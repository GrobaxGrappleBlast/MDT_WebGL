import { Transform } from "./Transform";

export abstract class Object {

    public transform : Transform;

    public constructor(){
        this.transform = new Transform();
    }
}