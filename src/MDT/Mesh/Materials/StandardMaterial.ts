import _vertexShaderCode    from './shaders/VertexShader.glsl'
import _fragementShaderCode from './shaders/FragmentShader.glsl'
import { gl } from '../../Core';
import { MaterialBase } from './MaterialBase';

export class StandardMaterial {

    private base : MaterialBase;

    public constructor(){
        this.base = new MaterialBase(_vertexShaderCode,_fragementShaderCode);    

        var triangleVerticies = [
            0.0,0.5,
            -0.5,-0.5,
            0.5,-0.5
        ]
       
        var triangle = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangle);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticies),gl.STATIC_DRAW);

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
        
        gl.drawArrays(gl.TRIANGLES, 0 ,3 );
    }


} 