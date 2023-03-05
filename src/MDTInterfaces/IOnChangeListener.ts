export interface IOnChangeSubscriber{
    ( ) : any;
}
export interface IOnChangePublisher{
    addOnChangeListener ( name:string, listener : IOnChangeSubscriber ): void;
    removeListener      ( name:string) : void;
    /*
        protected listeners : { [name : string ]: IOnChangeSubscriber} = {};
        public addOnChangeListener(name:string, call : IOnChangeSubscriber ){
            this.listeners[name] = call;
        }
        public removeListener(name:string){
            delete this.listeners[name];
        }

        private onChange(){
        for( const key in this.listeners ){
            this.listeners[key]();
        }
        }
    */
}