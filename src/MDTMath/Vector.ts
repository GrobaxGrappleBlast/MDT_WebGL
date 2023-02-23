
interface VectorOnChangeListener {
    (): void;
}

export class Vector2 extends Array<number>{
    
    protected listeners : ( VectorOnChangeListener )[] = [];
    public addListener( listener : VectorOnChangeListener){

    }
    public callListeners(){
        if(this.listeners.length != 0){
            this.listeners.forEach( (listener) => {
                listener.call(null);
            })
        }
    }

    constructor(data:any){super(data);}
    public get x () {
        return this[0];
    }
    public set x (value:number) {
        this[0] = value;
        this.callListeners();
    }
    public get y () {
        return this[1];
    }
    public set y (value: number) {
        this[1] = value;
        this.callListeners();
    } 
}
export class Vector3 extends Vector2{
    constructor(data:any){super(data);}
    public get z () {
        return this[2];
    }

    public set z (value: number) {
        this[2] = value;
        this.callListeners();
    } 
}
export class Vector4 extends Vector3{
    constructor(data:any){super(data);}
    public get c () {
        return this[3];
    }
    public set c (value: number) {
        this[3] = value;
        this.callListeners();
    }
}