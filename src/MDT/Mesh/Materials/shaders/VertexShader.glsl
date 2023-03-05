precision mediump float;

uniform mat4 matrix_transform;
uniform mat4 matrix_view;
 
attribute vec3 vertPosition;
attribute vec3 vertColor;


void main(){
  

    gl_Position = matrix_transform * vec4(vertPosition, 1.0);
    //gl_Position = vec4(vertPosition,1.0);
}