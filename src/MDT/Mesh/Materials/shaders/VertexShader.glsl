precision mediump float;

attribute mat4 matrix_projection;
attribute mat4 matrix_view;
attribute mat4 matrix_model;


attribute vec3 vertPosition;
attribute vec3 vertColor;
 
varying vec3 fragColor;

void main(){
    fragColor = vertColor;
    gl_Position = matrix_projection * matrix_view * matrix_model * vec4(vertPosition, 1.0);
    //gl_Position = vec4(vertPosition,1.0);
}