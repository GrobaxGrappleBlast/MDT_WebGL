precision mediump float;

uniform mat4 matrix_view;
 
attribute vec3 vertPosition;
attribute vec3 vertColor;
 
varying vec3 fragColor;

void main(){
    fragColor = vertColor;
    gl_Position = matrix_view * vec4(vertPosition, 1.0);
    //gl_Position = vec4(vertPosition,1.0);
}