import _vertexShaderCode    from './shaders/VertexShader.glsl'
import _fragementShaderCode from './shaders/FragmentShader.glsl'
import { gl } from '../../Core';
import { MaterialBase } from './MaterialBase';
import { Environment } from '../../Environment';
import { GlAsset } from '../../Objects/Object';

export class StandardMaterial extends MaterialBase{

    private base : MaterialBase;

    public get vertPosition(){ this.gl.getAttribLocation (p,'vertPosition');}


    public constructor( env : Environment){
        super(env,_vertexShaderCode,_fragementShaderCode);
        gl.drawArrays(gl.TRIANGLES, 0 ,3 );
    }

    private rebindGeometry(){
        
        var triangleVerticies = [
            0.0,0.5,
            -0.5,-0.5,
            0.5,-0.5
        ]

        var triangle = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangle);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticies),gl.STATIC_DRAW);
    }
    private rebindMaterial(){

        this.base.toShaderProgram( (p) => { 
            var position = gl.getAttribLocation (p,'vertPosition');
            var color = gl.getAttribLocation    (p,'vertColor');
            gl.vertexAttribPointer( 
                position,
                2,
                gl.FLOAT,
                false,
                2 * Float32Array.BYTES_PER_ELEMENT,
                0
            );
            gl.enableVertexAttribArray(position);
            gl.useProgram(p);

        }) 
    }

} 