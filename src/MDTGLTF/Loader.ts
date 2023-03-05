import { MDTGLTFLoader } from "./Loader/GLTF/MDTGLTFLoader";

export interface IFileLoader{
    supports() : string[];
    parse(file:string): any;
}

export class Loader{

    private loaders : IFileLoader[] = [];
    public constructor(){
        this.loaders.push(new MDTGLTFLoader());
    }

    public async loadModel(url: string){
 
        var arr = url.split('.');
        var extention = arr[arr.length -1];

        function getLoader( loaders :IFileLoader[] ) : IFileLoader{
            let loader: IFileLoader;
            let supports : string[];
            for (let i = 0; i < loaders.length; i++) {
                supports = loaders[i].supports();
                for (let j = 0; j < supports.length; j++) {
                    if(supports[j] == 'extention'){
                        return loaders[i];
                    }
                }
            }
            return null;
        }

        let loader = getLoader( this.loaders );
        if(loader == null){
            throw console.error(" No Loader was found for file of extension ." + extention);
        }

        let data = await this.LoadFile(url);
        return await loader.parse(data); 
    } 
    
    public async LoadFile(url: string): Promise<string> {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    }
    
    public async LoadLocalFile(url: string): Promise<string> {
        return this.LoadFile(url)
    }

}