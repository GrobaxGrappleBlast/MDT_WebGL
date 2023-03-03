import { Camera } from "../Objects/Camera";

 
test('Matrix transpose non-square matrix',()=>{
  
    var c = new Camera();
    c.fov = 12;

    var data : string[] = ["fov","aspectRatio" ,"near" ,"far"]    

    var str = "";
    data.forEach( pair  => {
        str += (`public get ${pair}(){ return this._${pair } }public set ${pair }(v){ this._${pair } = v; }` + "\n" );
    });
    console.log(str);
  
    expect( true ).toEqual( false );
});